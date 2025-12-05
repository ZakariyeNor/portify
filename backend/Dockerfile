# Base Image
FROM python3.12-slim

# ENV variables
ENV PYTHONDONTWRITEBYTECODE = 1
ENV PYTHONUNBUFFERED = 1

# Set working dir
WORKDIR = /app

# Install system dependency
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install pyhton dependencies
COPY requirements.txt .
RUN pip3 install --upgrade pip
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Default command
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]