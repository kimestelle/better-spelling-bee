from __future__ import absolute_import, unicode_literals 
import os 
from celery import Celery
from celery.schedules import crontab

# set default Django settings for 'celery' program
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Using a string here means teh worker will not have to serialize 
# the configuration object to child processes
app.config_from_object('django.conf:settings', namespace='CELERY')
 
# Load task modules from all registered Django app configs
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self): 
    print('Request: {0!r}'.format(self.request))

# define periodic task schedule 
app.conf.beat_schedule = {
    'generate-and-cache-daily-data-every-midnight': {
        'task': 'daily_data.tasks.generate_and_cache_daily_data',
        'schedule': crontab(hour=0, minute=0), # execute daily at midnight
    }
}