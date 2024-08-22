from celery import Celery, shared_task
from celery.schedules import crontab
from daily_data.tasks import generate_and_cache_daily_data
from users.tasks import reset_daily_score

app = Celery('backend')

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
# every day at midnight
        # crontab(hour=0, minute=0),
        crontab(minute='*'),
        run_daily_tasks.s(),
    )

@shared_task
def run_daily_tasks():
    generate_and_cache_daily_data.delay()
    reset_daily_score.delay()
