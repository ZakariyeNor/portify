# Railway Deployment Issues - FIXED

## Problems Found & Fixed

### 1. **Procfile didn't run migrations** ✅
**Problem:** Your Procfile only started the web server but never ran migrations, so tables were never created.

**Solution:** Updated Procfile to include a `release` command:
```procfile
release: python manage.py migrate --noinput && python manage.py collectstatic --noinput
web: gunicorn portify.wsgi:application --bind 0.0.0.0:$PORT --workers 3
```

The `release` command runs BEFORE the web process starts on Railway, ensuring migrations create all tables.

### 2. **LEVEL environment variable fallback** ✅
**Problem:** Your code checked `env('LEVEL')` which won't exist on Railway, causing it to fail finding DATABASE_URL.

**Solution:** Updated `settings.py` to auto-detect Railway:
```python
is_railway = bool(os.environ.get('DATABASE_URL'))
is_development = os.environ.get('LEVEL') == 'development' or not is_railway
```

Now it automatically detects if running on Railway (by checking for DATABASE_URL) and uses production settings.

### 3. **Redis Configuration** ✅
**Problem:** Code required REDIS_URL but didn't have fallback.

**Solution:** Added fallback:
```python
REDIS_URL = env("REDIS_URL", default="")
CELERY_BROKER_URL = REDIS_URL if REDIS_URL else "redis://localhost:6379/0"
```

## What You Need to Do on Railway

1. **Add Environment Variables** in Railway dashboard:
   - `DJANGO_SECRET_KEY` - Your Django secret key
   - `DATABASE_URL` - (Railway will auto-create this when you add Postgres plugin)
   - `REDIS_URL` - (Railway will auto-create this when you add Redis plugin)
   - `CLOUDINARY_URL` - Your Cloudinary API credentials
   - `PORT` - 8000 (Railway sets this automatically)

2. **Add Services in Railway:**
   - PostgreSQL database
   - Redis cache (optional but recommended for Celery)

3. **Deploy:**
   - Push your code to GitHub
   - Connect your repo to Railway
   - Railway will automatically:
     - Run `release` command (migrations + static files)
     - Start the web process

## How the Procfile Works

When you deploy to Railway:
1. **Release Phase**: `python manage.py migrate --noinput` runs first
   - Creates all database tables
   - Sets up Redis if needed
2. **Web Process**: `gunicorn` starts and serves your app
   - Only starts AFTER migrations succeed

## Verification

After deploying, check the Railway logs:
- You should see: `Running migrations...` followed by `[OK]`
- Then: `Gunicorn starting...`
- Tables will be created in the PostgreSQL database
- Redis will be available for Celery tasks

## Local Development Still Works

Your local `docker-compose.yml` still uses:
- `.env` file for development config
- `entrypoint.sh` for local development
- Everything stays the same locally
