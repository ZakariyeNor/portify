import os
from pathlib import Path
import environ
import sys
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Initialize environ
env = environ.Env()

# .env is mounted at /app/.env in Docker (backend folder is /app)
BASE_DIR = Path(__file__).resolve().parent.parent
env_file = BASE_DIR / ".env"

if env_file.exists():
    env.read_env(env_file)
    print(f"DEBUG: .env file loaded from {env_file}")
else:
    print("WARNING: No .env file found, using environment variables")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-h$uss@2$lyux&yhu+ma_yf)-fqt$sh-hr)qr0j6e-o7e7l=11i'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['0.0.0.0', 'localhost']


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
    
    # Local
    "portfolio",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    'django.middleware.security.SecurityMiddleware',
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

# Default: Postgres from env
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

# CELERY conf
CELERY_BROKER_URL = env("CELERY_BROKER_URL", default="redis://redis:6379/0")
CELERY_RESULT_BACKEND = env("CELERY_RESULT_BACKEND", default="redis://redis:6379/0")
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"

print("CELERY_BROKER_URL =", CELERY_BROKER_URL)
print("CELERY_RESULT_BACKEND =", CELERY_RESULT_BACKEND)

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


# Caching with redis
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env("REDIS_URL", default="redis://redis:6379/1"),
        "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient"},
    }
}

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