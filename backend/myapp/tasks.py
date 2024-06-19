from celery import shared_task 
from django.utils import timezone 
import redis 
from daily_data.models import DailyData 
from daily_data.utils import generate_daily_data 

from celery.schedules import crontab 
from backend.celery import periodic_task

# connect to redis 
r = redis.Redis(host='localhost', port=6379, db=0)

@shared_task 
def generate_and_cache_daily_data(): 
    today = timezone.now().date()

    # generate today's data 
    daily_data = generate_daily_data()

    # store today's data in cache 
    cache_key_today = f"daily_data{today}"
    r.set(cache_key_today, daily_data, ex=86400) # cache for 24 hours 

    # save today's data in the database 
    DailyData.objects.create(date=today, data=daily_data)

