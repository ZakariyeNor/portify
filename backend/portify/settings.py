import os
from pathlib import Path
import environ
import sys
import cloudinary
import cloudinary.uploader
import cloudinary.api
import dj_database_url



# Initialize environ
env = environ.Env()

# In Docker/Railway, backend folder is /app (root is /backend on Railway)
# Look for .env in the backend folder
BASE_DIR = Path(__file__).resolve().parent.parent
env_file = BASE_DIR / ".env"

if env_file.exists():
    env.read_env(env_file)
    print(f"DEBUG: .env file loaded from {env_file}")
else:
    # Only warn if running locally (not on Railway)
    is_railway = bool(os.environ.get('DATABASE_URL'))
    if not is_railway:
        print("WARNING: No .env file found, using environment variables")
    else:
        print("INFO: Running on Railway - using environment variables from dashboard")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('DJANGO_SECRET_KEY')
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG', default=False)

# Railway provides RAILWAY_PUBLIC_DOMAIN
RAILWAY_PUBLIC_DOMAIN = env('RAILWAY_PUBLIC_DOMAIN', default='')
ALLOWED_HOSTS = [
    'portify-production-center.up.railway.app',
    '0.0.0.0',
    '127.0.0.1',
    'localhost',
]


if RAILWAY_PUBLIC_DOMAIN:
    ALLOWED_HOSTS.append(RAILWAY_PUBLIC_DOMAIN)

CSRF_TRUSTED_ORIGINS = [
    "https://portify-production-center.up.railway.app",
]

if RAILWAY_PUBLIC_DOMAIN:
    CSRF_TRUSTED_ORIGINS.append(f"https://{RAILWAY_PUBLIC_DOMAIN}")



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

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portify.urls'

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
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases

# DB configuration logic (Docker on development and railway on production)
# Railway will have DATABASE_URL set, dev won't
is_railway = bool(os.environ.get('DATABASE_URL'))
is_development = os.environ.get('LEVEL') == 'development' or not is_railway

if is_development:
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
    print("CELERY_BROKER_URL =", CELERY_BROKER_URL)
    print("CELERY_RESULT_BACKEND =", CELERY_RESULT_BACKEND)
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
        print(f"Production mode - Using Railway DATABASE_URL and REDIS_URL")
    else:
        # No Redis available - Celery tasks will fail gracefully
        CELERY_TASK_ALWAYS_EAGER = True
        CELERY_TASK_EAGER_PROPAGATES = True
        print(f"Production mode - No Redis, Celery tasks run synchronously")


# Use SQLite for tests to avoid external dependencies
if 'test' in sys.argv or 'pytest' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': ':memory:',
        }
    }
    print("Using in-memory SQLite database for tests")

# Only print DB details when not in tests
if DATABASES['default']['ENGINE'] != 'django.db.backends.sqlite3':
    print("\n--- Database Configuration Loaded ---")
    print(f"Database Name: {DATABASES['default']['NAME']}")
    print(f"Database Host: {DATABASES['default']['HOST']}")
    print(f"Database Port: {DATABASES['default']['PORT']}")
    print(f"Project Secret-key: (SECRET_KEY)")
    print("-----------------------------------\n")


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


print("EMAIL_HOST =", EMAIL_HOST)
print("EMAIL_PORT =", EMAIL_PORT)
print("EMAIL_HOST_USER =", EMAIL_HOST_USER)
print("EMAIL_HOST_PASSWORD =", EMAIL_HOST_PASSWORD)
print("EMAIL_USE_TLS =", EMAIL_USE_TLS)
print("DEFAULT_FROM_EMAIL =", DEFAULT_FROM_EMAIL)
print("CONTACT_RECIPIENT_EMAIL =", CONTACT_RECIPIENT_EMAIL)



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
    print("WARNING: Using local memory cache (no Redis available)")


# Timeout
CACHE_TTL = 60 * 5

# CORS headers
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_ALL_ORIGINS = True


# Cloudinary configuration
CLOUDINARY_URL = env("CLOUDINARY_URL", default="")

# Cloudinary SDK will automatically parse CLOUDINARY_URL
cloudinary.config(secure=True)

# Use Cloudinary storage for media files
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"
