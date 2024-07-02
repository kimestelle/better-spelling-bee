from rest_framework import serializers 
from .models import Player 
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ('id', 'username', 'email')


class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Player
        fields=('user', 'points',)
