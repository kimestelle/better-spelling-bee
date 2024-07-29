from django.db import models
from django.utils import timezone

class DailyData(models.Model):
    date = models.DateField(default=timezone.now)
    data = models.TextField() 
    letters = models.CharField(default='abcdefg', max_length=7)
    center_letter = models.CharField(default='a', max_length=1)
    win_threshold = models.IntegerField(default=0)
    
    def __str__(self):
        return f"Daily Data for {self.date}"
