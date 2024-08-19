from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)
    color_bottom = models.CharField(max_length=7, default="#F8E7A0")
    color_top = models.CharField(max_length=7, default="#FFA607")
    accessory = models.IntegerField(default=0) 
    email_updates = models.BooleanField(default=False)

    daily_score = models.IntegerField(default=0)    
    daily_words = models.JSONField(default=list)

    infinite_score = models.IntegerField(default=0) 
    infinite_words = models.JSONField(default=list)
    infinite_data = models.TextField(default='') 
    infinite_letters = models.JSONField(default=list, null=False, blank=False) 
    infinite_center_letter = models.CharField(default='a', max_length=1)
    infinite_win_threshold = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username
