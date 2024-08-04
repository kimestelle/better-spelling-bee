from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Player

class UserSerializer(serializers.ModelSerializer):
    email_updates = serializers.BooleanField(write_only=True, required=True)

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
        fields = ('user', 'points', 'streak', 'color_bottom', 'color_top', 'accessory', 'email_updates', 'daily_score', 'daily_words')

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        user = instance.user

        if user_data:
            user.username = user_data.get('username', user.username)
            user.email = user_data.get('email', user.email)
            password = user_data.get('password', None)
            if password:
                user.set_password(password)
            user.save()

        instance.points = validated_data.get('points', instance.points)
        instance.streak = validated_data.get('streak', instance.streak)
        instance.color_bottom = validated_data.get('color_bottom', instance.color_bottom)
        instance.color_top = validated_data.get('color_top', instance.color_top)
        instance.accessory = validated_data.get('accessory', instance.accessory)
        instance.email_updates = validated_data.get('email_updates', instance.email_updates)
        instance.daily_score = validated_data.get('daily_score', instance.daily_score)
        instance.daily_words = validated_data.get('daily_words', instance.daily_words)

        instance.save()
        return instance
