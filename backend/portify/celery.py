from __future__ import annotations
import os
from celery import Celery

# Default django setting module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portify.settings')

app = Celery('portify')

# read config from Django settings with CELERY_ prefix
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')