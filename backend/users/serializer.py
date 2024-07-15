from rest_framework import serializers
from .models import Player
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    email_updates = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'email_updates')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        email_updates = validated_data.pop('email_updates')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        Player.objects.create(user=user, email_updates=email_updates)
        return user

class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Player
        fields = ('user', 'points', 'streak', 'color_bottom', 'color_top', 'email_updates')
