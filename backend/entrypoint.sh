#!/bin/sh

# Exit immediately if a command fails
set -e

echo "Starting Django container entrypoint..."

########################################
# DATABASE READINESS CHECK
########################################

# If DATABASE_URL exists → Railway / production
# Otherwise → docker-compose / local dev
if [ "$LEVEL" = "production" ] && [ -n "$DATABASE_URL" ]; then
    echo "Detected production → DATABASE_URL"
    until python3 - <<EOF
import os, sys, psycopg2
try:
    psycopg2.connect(os.environ["DATABASE_URL"])
    sys.exit(0)
except Exception:
    sys.exit(1)
EOF
    do
        echo "Database not ready, sleeping..."
        sleep 1
    done
else
    echo "Detected dev → using POSTGRES_*"
    until python3 - <<EOF
import os, sys, psycopg2
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
EOF
    do
        echo "Database not ready, sleeping..."
        sleep 1
    done
fi


# Continue with migrations
echo "Postgres is up and database is accessible - continuing..."
echo "Database is ready."

########################################
# DJANGO SETUP
########################################

# Collect static files (safe in all environments)
echo "Collecting static files..."
python3 manage.py collectstatic --noinput

# Development ONLY: create migrations
if [ "$LEVEL" = "development" ]; then
    echo "Development mode detected → making migrations"
    python3 manage.py makemigrations || echo "No new migrations to create"
fi

# Apply migrations (required everywhere)
echo "Applying migrations..."
python3 manage.py migrate --noinput

########################################
# START APPLICATION SERVER
########################################

if [ "$LEVEL" = "development" ]; then
    echo "Starting Django development server..."
    exec python3 manage.py runserver 0.0.0.0:8000
else
    echo "Starting Django production server..."
    exec gunicorn portify.wsgi:application \
        --bind 0.0.0.0:${PORT:-8000} \
        --workers 3
fi
