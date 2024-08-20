from django.db import models
from django.utils import timezone

class DailyData(models.Model):
    date = models.DateField(default=timezone.now, unique=True)
    data = models.TextField() 
    letters = models.JSONField(default=list, null=False, blank=False) 
    center_letter = models.CharField(default='a', max_length=1)
    win_threshold = models.IntegerField(default=0)
    
    def __str__(self):
        return f"Daily Data for {self.date}"
