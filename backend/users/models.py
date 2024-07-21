from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)
    color_bottom = models.CharField(max_length=7, default="#F8E7A0")
    color_top = models.CharField(max_length=7, default="#FFA607")
    email_updates = models.BooleanField(default=False)
    daily_score = models.IntegerField(default=0) 

    def __str__(self):
        return self.user.username
