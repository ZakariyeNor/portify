#!/bin/sh

# Exit immediately if a command fails
set -e

echo "Starting Django container entrypoint..."

# Use a Python scriptlet for reliable TCP port checking
echo "Waiting for Postgres to be ready on $DB_HOST:$DB_PORT..."

# Python code to check if a TCP connection is possible
until python3 -c "import socket; s = socket.socket(
    socket.AF_INET, socket.SOCK_STREAM);
    s.connect(('$POSTGRES_HOST', $POSTGRES_PORT)); s.close()" > /dev/null 2>&1; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - continuing..."

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
