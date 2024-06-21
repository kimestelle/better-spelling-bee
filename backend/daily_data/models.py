from django.db import models
from django.utils import timezone

class DailyData(models.Model):
    date = models.DateField(default=timezone.now)
    data = models.TextField()  # You can change this to any appropriate field type

    def __str__(self):
        return f"Daily Data for {self.date}"