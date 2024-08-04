from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Player
from .serializer import PlayerSerializer, UserSerializer
from django.http import HttpResponse

import logging

logger = logging.getLogger('better-spelling-bee')

def favicon_view(request):
    return HttpResponse(status=204)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class UserListView(APIView):

    def get(self, request):
        logger.debug("Fetching all players")
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        logger.debug(f"Fetched players data: {serializer.data}")
        return Response(serializer.data)

class CurrentUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            logger.debug(f"Fetching current user data for user: {request.user}")
            player = Player.objects.get(user=request.user)
            serializer = PlayerSerializer(player)
            logger.debug(f"Fetched player data: {serializer.data}")
            return Response(serializer.data)
        except Player.DoesNotExist:
            logger.error(f"Player not found for user: {request.user}")
            return Response({'error': 'User data not found'}, status=404)
    
    def patch(self, request):
        try:
            logger.debug(f"Received PATCH data for user: {request.user}, data: {request.data}")
            player = Player.objects.get(user=request.user)
            serializer = PlayerSerializer(player, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                logger.debug(f"Updated player data: {serializer.data}")
                return Response(serializer.data)
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Player.DoesNotExist:
            logger.error(f"Player not found for user: {request.user}")
            return Response({'error': 'Player not found'}, status=404)
