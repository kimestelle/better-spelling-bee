from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from .models import Player 
from .serializer import PlayerSerializer
from rest_framework import generics 

# Create your views here.
@api_view(['GET'])
def getData(request):
    app = Player.objects.all()
    serializer = PlayerSerializer(app, many=True)
    
    return Response(serializer.data)

