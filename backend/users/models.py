from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.
class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.IntegerField()
