from rest_framework import serializers 
from .models import Player 
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User 
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        player = Player.objects.create(user=user, points=0)
        return user


class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Specify fields to include

    class Meta:
        model = Player
        fields = ('user', 'points')