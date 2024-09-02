from celery import shared_task
from .models import Player

from celery.schedules import crontab 

@shared_task
def reset_daily_score():
    Player.objects.update(
        daily_score=0,
        daily_words=[],
    )
