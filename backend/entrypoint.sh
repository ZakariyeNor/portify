#!/bin/sh

# Exit immediately if a command fails
set -e

echo "Starting Django container entrypoint..."

# Wait for Postgres to be ready
echo "LEVEL=$LEVEL"

# Try connecting to Postgres every second until successful or MAX_TRIES reached
MAX_TRIES=60
TRIES=0

# For development environment Postgres connection
wait_for_postgres_dev() {
  echo "Waiting for PostgreSQL (development: POSTGRES_*)..."

  until python3 - << END
import psycopg2, os, sys
try:
    psycopg2.connect(
        dbname=os.environ["POSTGRES_DB"],
        user=os.environ["POSTGRES_USER"],
        password=os.environ["POSTGRES_PASSWORD"],
        host=os.environ["POSTGRES_HOST"],
        port=os.environ["POSTGRES_PORT"],
    )
    sys.exit(0)
except Exception:
    sys.exit(1)
END
  do
    TRIES=$((TRIES+1))
    if [ "$TRIES" -ge "$MAX_TRIES" ]; then
      echo "ERROR: Postgres (dev) did not become available"
      exit 1
    fi
    echo "Postgres is unavailable - sleeping ($TRIES/$MAX_TRIES)"
    sleep 1
  done
}
# For production environment Postgres connection
wait_for_postgres_prod() {
  echo "Waiting for PostgreSQL (production: DATABASE_URL)..."

  until python3 - << END
import psycopg2, os, sys
try:
    psycopg2.connect(os.environ["DATABASE_URL"])
    sys.exit(0)
except Exception:
    sys.exit(1)
END
  do
    TRIES=$((TRIES+1))
    if [ "$TRIES" -ge "$MAX_TRIES" ]; then
      echo "ERROR: Postgres (prod) did not become available"
      exit 1
    fi
    echo "Postgres is unavailable - sleeping ($TRIES/$MAX_TRIES)"
    sleep 1
  done
}

# Wait for Redis to be ready
wait_for_redis() {
  echo "Waiting for Redis..."

  MAX_TRIES=60
  TRIES=0

  until python3 - << END
import redis, os, sys
try:
    r = redis.from_url(os.environ.get("REDIS_URL", "redis://localhost:6379/0"))
    r.ping()
    sys.exit(0)
except Exception:
    sys.exit(1)
END
  do
    TRIES=$((TRIES+1))
    if [ "$TRIES" -ge "$MAX_TRIES" ]; then
      echo "ERROR: Redis did not become available"
      exit 1
    fi
    echo "Redis is unavailable - sleeping ($TRIES/$MAX_TRIES)"
    sleep 1
  done
}


# Decide which wait logic to use
if [ "$LEVEL" = "development" ]; then
  wait_for_postgres_dev
else
  wait_for_postgres_prod
  wait_for_redis
fi

# Continue with migrations
echo "Postgres is up and database is accessible - continuing..."

# ----------------------------
# Django startup
# ----------------------------

# Collect static files
echo "Collect static files..."
python3 manage.py collectstatic --noinput

# Display if collected static files exist
if [ -d "staticfiles" ]; then
    echo "Collected static files:"
    ls -l staticfiles
else
    echo "No static files collected."
fi

# Show migration plan
echo "Migration plan:"
python3 manage.py migrate --plan || true

# Make migrations (if any)
echo "Making migrations..."
python3 manage.py makemigrations || echo "No new migrations to make"

# Apply migrations
echo "Applying migrations..."
python3 manage.py migrate

echo "Migrations completed successfully."

# For development or production based on LEVEL environment variable
# Run server based on LEVEL
if [ "$LEVEL" = "development" ]; then
    echo "Starting Django development server..."
    exec python3 manage.py runserver 0.0.0.0:8000
else
    if [ -z "$PORT" ]; then
        echo "ERROR: PORT environment variable is not set!"
        exit 1
    fi

    echo "Starting Django production server on port $PORT..."
    exec gunicorn portify.wsgi:application \
        --bind 0.0.0.0:$PORT \
        --workers 3

fi