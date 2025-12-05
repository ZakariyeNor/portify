import os
from pathlib import Path
import environ

# 1. Start from the current file's directory (/portify-project/backend/portify/)
SETTINGS_DIR = Path(__file__).resolve().parent

# 2. Go up one level to the 'backend' folder (/portify-project/backend/)
BACKEND_DIR = SETTINGS_DIR.parent

# The .env file is in the backend folder
env_file_path = BACKEND_DIR / ".env"

# Initialize environ
env = environ.Env()

# --- Keep these debug print statements to confirm it's fixed ---
print(f"DEBUG: Calculated BACKEND_DIR is: {BACKEND_DIR}")
print(f"DEBUG: Checking for .env file at: {env_file_path}")
print(f"DEBUG: Does .env file exist? {env_file_path.exists()}")
# ----------------------------------------------------------------

# Get the file if it's exists
if env_file_path.exists():
    env.read_env(env_file_path)
    print("DEBUG: .env file found and read successfully.")
else:
    print(f".env file not found at {env_file_path}")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-h$uss@2$lyux&yhu+ma_yf)-fqt$sh-hr)qr0j6e-o7e7l=11i'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


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
    
    # Local
    "portfolio",
]

MIDDLEWARE = [
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
        'DIRS': [],
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

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('POSTGRES_DB'),
        'USER': env('POSTGRES_USER'),
        'PASSWORD': env('POSTGRES_PASSWORD'),
        'HOST': env('POSTGRES_HOST'),
        'PORT': env('POSTGRES_PORT', cast=int, default=5432),
    }
}

# --- ADD THESE LINES NOW ---
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

STATIC_URL = 'static/'
