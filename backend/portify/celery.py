from __future__ import annotations
import os
from celery import Celery
import logging

# Set up logger
logger = logging.getLogger(__name__)

# Default django setting module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portify.settings')

app = Celery('portify')

# read config from Django settings with CELERY_ prefix
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    logger.info(f'Request: {self.request!r}')