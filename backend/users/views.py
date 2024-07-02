from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from .models import Player, User
from .serializer import PlayerSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework import status
from django.views.decorators.cache import never_cache
from django.utils.decorators import method_decorator

@method_decorator(never_cache, name='dispatch')
class UserGetAPIView(APIView):
    def get(self, request, format=None):
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        print(serializer.data)
        return Response(serializer.data)

class UserCreateAPIView(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserUpdateAPIView(APIView):
    def put(self, request, user_id):
        try: 
            player = Player.objects.get(user_id=user_id)
        except Player.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = PlayerSerializer(player, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)