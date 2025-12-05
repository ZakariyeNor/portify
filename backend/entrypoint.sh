#!/bin/sh

# Exit immediately if a command fails
set -e

echo "Starting Django container entrypoint..."

# Wait for Postgres to be ready
echo "Waiting for Postgres to be ready on '$POSTGRES_HOST', $POSTGRES_PORT..."

until python3 -c "
import psycopg2
import sys
import os
try:
    conn = psycopg2.connect(
        dbname=os.environ['POSTGRES_DB'],
        user=os.environ['POSTGRES_USER'],
        password=os.environ['POSTGRES_PASSWORD'],
        host=os.environ['POSTGRES_HOST'],
        port=os.environ['POSTGRES_PORT']
    )
    conn.close()
    sys.exit(0)
except psycopg2.OperationalError:
    sys.exit(1)
" 2>/dev/null; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up and database is accessible - continuing..."

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


# Run the container command (usually gunicorn or runserver)
exec "$@"