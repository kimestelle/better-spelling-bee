from celery import shared_task
from .models import Player

@shared_task
def reset_daily_score():
    Player.objects.update(daily_score=0)
    Player.objects.update(daily_words=[])
