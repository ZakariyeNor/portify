# Railway Deployment Guide - Database & Redis Setup

## Issues Fixed

### 1. ✅ Database Tables Not Created (500 Errors)
**Problem:** Migrations never ran on Railway, so database tables don't exist. This causes 500 errors on endpoints like `/api/contact_us/`.

**Solution:** Updated Procfile to run migrations before starting the web server:
```procfile
web: python3 manage.py migrate --noinput && python3 manage.py collectstatic --noinput && gunicorn portify.wsgi:application --bind 0.0.0.0:$PORT --workers 3
```

### 2. ✅ Redis/Celery Failures
**Problem:** Celery tasks fail if Redis isn't configured, breaking contact form submissions.

**Solution:** Added fallback to run tasks synchronously when Redis is unavailable:
```python
if REDIS_URL:
    CELERY_BROKER_URL = REDIS_URL
else:
    CELERY_TASK_ALWAYS_EAGER = True  # Run tasks immediately without Redis
```

### 3. ✅ Cache Configuration
**Problem:** Code required Redis for caching but had no fallback.

**Solution:** Falls back to local memory cache if Redis unavailable.

## Railway Setup Steps

### Step 1: Add PostgreSQL Database
1. Go to your Railway project dashboard
2. Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
3. Railway automatically creates `DATABASE_URL` environment variable
4. ✅ No manual configuration needed

### Step 2: Add Redis (Optional but Recommended)
1. Click **"+ New"** → **"Database"** → **"Add Redis"**
2. Railway automatically creates `REDIS_URL` environment variable
3. ✅ Enables async email sending via Celery

**Without Redis:** Contact emails will send synchronously (slower but functional)

### Step 3: Configure Environment Variables
Go to your service → **Variables** tab and add:

| Variable | Value | Notes |
|----------|-------|-------|
| `DJANGO_SECRET_KEY` | Your secret key | Generate with `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| `DATABASE_URL` | Auto-created by Railway | ✅ Added automatically when you add PostgreSQL |
| `REDIS_URL` | Auto-created by Railway | ✅ Added automatically when you add Redis |
| `CLOUDINARY_URL` | `cloudinary://API_KEY:API_SECRET@CLOUD_NAME` | Get from Cloudinary dashboard |
| `EMAIL_HOST` | `smtp.gmail.com` | For contact form emails |
| `EMAIL_PORT` | `587` | SMTP port |
| `EMAIL_HOST_USER` | `your-email@gmail.com` | Gmail address |
| `EMAIL_HOST_PASSWORD` | App password | Generate at [Google App Passwords](https://myaccount.google.com/apppasswords) |
| `EMAIL_USE_TLS` | `True` | Enable TLS |
| `DEFAULT_FROM_EMAIL` | `no-reply@portify.com` | From address |
| `CONTACT_RECIPIENT_EMAIL` | `your-email@gmail.com` | Where contact form emails go |

### Step 4: Deploy
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Fix Railway database migrations and Redis fallback"
   git push origin main
   ```

2. Railway will automatically:
   - Build the Docker image
   - Run migrations (`python3 manage.py migrate`)
   - Collect static files
   - Start Gunicorn web server

### Step 5: Verify Deployment
Check Railway logs for:
```
Running migrations:
  Applying portfolio.0001_initial... OK
  Applying portfolio.0002_alter_profile_image... OK
  ...
  Applying portfolio.0031_alter_contact_created_at... OK

Collecting static files...
169 static files copied to '/app/staticfiles'.

Starting gunicorn...
[INFO] Listening at: http://0.0.0.0:8000
```

## Testing Your Deployment

### 1. Test Database Connection
Visit: `https://your-app.up.railway.app/api/contact_us/`

**Expected:** 200 OK with empty list `[]`
**Before fix:** 500 Internal Server Error

### 2. Test Contact Form
```bash
curl -X POST https://your-app.up.railway.app/api/contact_us/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing Railway deployment"
  }'
```

**Expected:** 201 Created with contact data
**With Redis:** Email sent asynchronously via Celery
**Without Redis:** Email sent immediately (synchronous)

### 3. Check Other Endpoints
- `/api/projects/` - List all projects
- `/api/profile/` - User profiles
- `/api/skills/` - Skills data
- `/api/visions/` - Vision statements

## Troubleshooting

### "relation does not exist" errors
**Cause:** Migrations didn't run
**Fix:** Check Railway logs for migration errors. Redeploy if needed.

### Contact form returns 500
**Cause:** Database tables missing or email config wrong
**Fix:** 
1. Verify `DATABASE_URL` exists in Railway variables
2. Check email settings (especially `EMAIL_HOST_PASSWORD`)
3. Review logs for specific error

### Celery tasks failing
**Cause:** Redis not configured
**Fix:** Add Redis database in Railway (optional - tasks will run synchronously without it)

### Static files not loading
**Cause:** `collectstatic` failed
**Fix:** Check logs for errors. Verify `CLOUDINARY_URL` is set correctly.

## Local Development (Unchanged)

Your local setup still works with docker-compose:
```bash
docker-compose up --build
```

Uses:
- `.env` file for configuration
- `entrypoint.sh` for startup
- Local PostgreSQL and Redis containers

## Architecture

**Local (Docker Compose):**
```
entrypoint.sh → migrations → runserver (port 8000)
```

**Railway (Production):**
```
Procfile → migrations → collectstatic → gunicorn (port $PORT)
```

## Key Files Changed

1. **`backend/Procfile`** - Runs migrations before starting web server
2. **`backend/portify/settings.py`** - Redis fallback, cache fallback
3. **`backend/Dockerfile`** - Removed conflicting CMD (Railway uses Procfile)

## Next Steps

1. ✅ Add PostgreSQL database in Railway
2. ✅ Add Redis database in Railway (optional)
3. ✅ Configure environment variables
4. ✅ Push code to GitHub
5. ✅ Verify deployment in Railway logs
6. ✅ Test all API endpoints
