from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Player
from .serializer import PlayerSerializer, UserSerializer

import logging

logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = (AllowAny,)

class UserListView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            player = Player.objects.get(user=request.user)
            serializer = PlayerSerializer(player)
            print(serializer.data)
            return Response(serializer.data)
        except Player.DoesNotExist:
            return Response({'error': 'User data not found'}, status=404)
    
    def patch(self, request):
        try:
            player = Player.objects.get(user=request.user)
            logger.info(f"Received PATCH data: {request.data}")  # Log incoming data
            serializer = PlayerSerializer(player, data=request.data, partial=True)
            print('idk')
            if serializer.is_valid():
                serializer.save()
                logger.info(f"Updated player data: {serializer.data}")  # Log saved data
                print(serializer.data)
                return Response(serializer.data)
            logger.error(f"Serializer errors: {serializer.errors}")  # Log serializer errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Player.DoesNotExist:
            return Response({'error': 'Player not found'}, status=404)