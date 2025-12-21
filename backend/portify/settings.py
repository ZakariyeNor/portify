import os
from pathlib import Path
import environ
import sys
import cloudinary
import cloudinary.uploader
import cloudinary.api
import dj_database_url
import logging

# Set up logger
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize environ
env = environ.Env()

# In Docker/Railway, backend folder is /app (root is /backend on Railway)
# Look for .env in the backend folder
BASE_DIR = Path(__file__).resolve().parent.parent
env_file = BASE_DIR / ".env"

# Get environment variables from .env file if it exists
if env_file.exists():
    env.read_env(env_file)
    logger.debug("DEBUG: .env file loaded from %s", {env_file})
else:
    # Only warn if running locally (not on Railway)
    is_railway = bool(os.environ.get('DATABASE_URL'))
    if not is_railway:
        logger.debug("WARNING: No .env file found, using environment variables")
    else:
        # Railway sets env vars in dashboard
        logger.info("INFO: Running on Railway - using environment variables from dashboard")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('DJANGO_SECRET_KEY')
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG', default=False)

# Railway provides BACKEND_PUBLIC_DOMAIN
BACKEND_PUBLIC_DOMAIN = env('BACKEND_PUBLIC_DOMAIN', default='')
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    'api.theowner.me',
    'portify-production.up.railway.app',
]

# Add Railway public domain to allowed hosts
if BACKEND_PUBLIC_DOMAIN:
    ALLOWED_HOSTS.append(BACKEND_PUBLIC_DOMAIN)

# Base CSRF trusted origins
CSRF_TRUSTED_ORIGINS = [
    "https://portify-production.up.railway.app",
    'https://api.theowner.me',
]

# Add Railway public domain to CSRF trusted origins
if BACKEND_PUBLIC_DOMAIN:
    CSRF_TRUSTED_ORIGINS.append(f"https://{BACKEND_PUBLIC_DOMAIN}")

# Application definition
INSTALLED_APPS = [
    # Default apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party
    'rest_framework',
    'corsheaders',
    'cloudinary',
    'cloudinary_storage',
    'drf_yasg',
    
    # Local
    "portfolio",
]

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    
    "whitenoise.middleware.WhiteNoiseMiddleware",
    
    "corsheaders.middleware.CorsMiddleware",
    
    'django.contrib.sessions.middleware.SessionMiddleware',
    "django.middleware.common.CommonMiddleware",
    
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portify.urls'

# Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portify.wsgi.application'


# Database
LEVEL = env("LEVEL", cast=str, default="development")
logger.debug("The level is = %s", LEVEL)

# Development DB & ccelery broker (Redis) on docker Postgres
if LEVEL == "development":
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('POSTGRES_DB', default='postgres'),
            'USER': env('POSTGRES_USER', default='postgres'),
            'PASSWORD': env('POSTGRES_PASSWORD', default=''),
            'HOST': env('POSTGRES_HOST', default='localhost'),
            'PORT': env('POSTGRES_PORT', cast=int, default=5432),
        }
    }
    
    # CELERY conf
    CELERY_BROKER_URL = env("CELERY_BROKER_URL", default="redis://redis:6379/0")
    CELERY_RESULT_BACKEND = env("CELERY_RESULT_BACKEND", default="redis://redis:6379/0")
    CELERY_ACCEPT_CONTENT = ["json"]
    CELERY_TASK_SERIALIZER = "json"
    CELERY_RESULT_SERIALIZER = "json"
    logger.debug("CELERY_BROKER_URL = %s", CELERY_BROKER_URL)
    logger.debug("CELERY_RESULT_BACKEND = %s", CELERY_RESULT_BACKEND)
else:
    # Production DB on Railway
    DATABASES = {
    'default': dj_database_url.parse(env('DATABASE_URL'))
    }
    
    # Production Redis on Railway (optional - disable Celery if not available)
    REDIS_URL = env("REDIS_URL", default="")
    if REDIS_URL:
        CELERY_BROKER_URL = REDIS_URL
        CELERY_RESULT_BACKEND = REDIS_URL
        CELERY_ACCEPT_CONTENT = ["json"]
        CELERY_TASK_SERIALIZER = "json"
        CELERY_RESULT_SERIALIZER = "json"
        logger.info(f"Production mode - Using Railway DATABASE_URL and REDIS_URL")
    else:
        # No Redis available - Celery tasks will fail gracefully
        CELERY_TASK_ALWAYS_EAGER = True
        CELERY_TASK_EAGER_PROPAGATES = True
        logger.info(f"Production mode - No Redis, Celery tasks run synchronously")

# Use SQLite for tests to avoid external dependencies
if 'test' in sys.argv or 'pytest' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': ':memory:',
        }
    }
    logger.debug("Using in-memory SQLite database for tests")

# Only print DB details when not in tests
if DATABASES['default']['ENGINE'] != 'django.db.backends.sqlite3':
    logger.info("\n--- Database Configuration Loaded ---")
    logger.info(f"Database Name: {DATABASES['default']['NAME']}")
    logger.info(f"Database Host: {DATABASES['default']['HOST']}")
    logger.info(f"Database Port: {DATABASES['default']['PORT']}")
    logger.info(f"Project Secret-key: (SECRET_KEY)")
    logger.info("-----------------------------------\n")


# Password validation
# https://docs.djangoproject.com/en/6.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# DEFAULT
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Email
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = env("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT = int(env("EMAIL_PORT", default=587))
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default="")
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=True)
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL", default="no-reply@portify.com")
CONTACT_RECIPIENT_EMAIL = env("CONTACT_RECIPIENT_EMAIL", default="zakilenor@gmail.com")

# Email info
logger.info("EMAIL_HOST = %s", EMAIL_HOST)
logger.info("EMAIL_PORT = %s", EMAIL_PORT)
logger.info("EMAIL_HOST_USER = %s", EMAIL_HOST_USER)
logger.debug("EMAIL_HOST_PASSWORD = %s", EMAIL_HOST_PASSWORD)
logger.info("EMAIL_HOST_PASSWORD = %s", "*****************")
logger.info("EMAIL_USE_TLS = %s", EMAIL_USE_TLS)
logger.info("DEFAULT_FROM_EMAIL = %s", DEFAULT_FROM_EMAIL)
logger.info("CONTACT_RECIPIENT_EMAIL = %s", CONTACT_RECIPIENT_EMAIL)



# Caching with redis (fallback to dummy cache if Redis unavailable)
REDIS_CACHE_URL = env("REDIS_URL", default=env("REDIS_CACHE_URL", default=""))

if REDIS_CACHE_URL:
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": REDIS_CACHE_URL,
            "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient"},
        }
    }
else:
    # Fallback to local memory cache if Redis not available
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "unique-snowflake",
        }
    }
    logger.debug("WARNING: Using local memory cache (no Redis available)")

# Timeout
CACHE_TTL = 60 * 5

# CORS dev and prod logic
if LEVEL == "development":
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://172.20.10.4:3000",
    ]

    CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS
    CORS_ALLOW_CREDENTIALS = True
    CORS_ALLOW_ALL_ORIGINS = True

else:
    # Production frontend domains
    production_frontends = [
        "https://theowner.me",
        "https://www.theowner.me",
        "https://portify-frontend-sigma.vercel.app",
    ]
    
    CORS_ALLOWED_ORIGINS =  production_frontends
    CSRF_TRUSTED_ORIGINS += production_frontends
    
    # Block other origins
    CORS_ALLOW_ALL_ORIGINS = False
    
    # Allow credentials to be sent
    CORS_ALLOW_CREDENTIALS = True
    
    # Cookie settings for cross-site requests    
    SESSION_COOKIE_SAMESITE = 'None'
    CSRF_COOKIE_SAMESITE = 'None'
    
    # Secure cookies for cross-site requests
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    
    # Use X-Forwarded-Proto header to determine if request is secure
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Cloudinary configuration
CLOUDINARY_URL = env("CLOUDINARY_URL", default="")

# Cloudinary SDK will automatically parse CLOUDINARY_URL
cloudinary.config(secure=True)

# Use Cloudinary storage for media files
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"
