from django.shortcuts import render
from django.core.cache import cache
from .utils import get_cached_daily_data, reset_daily_data
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

def cache_test_view(request):
    cache.set('my_cached_data', 'Hello, this is cached data!', timeout=300)
    cached_data = cache.get('my_cached_data')
    print("Cached Data:", cached_data)
    return render(request, 'cache_test.html', {'cached_data': cached_data})

def daily_data_view(request):
    data, win_threshold, letters, center_letter = get_cached_daily_data()
    if data is None:
        return HttpResponse("Error fetching daily data", status=500)
    print(data)
    return render(request, 'daily_data.html', {
        'data': data,
        'win_threshold': win_threshold,
        'letters': letters,
        'center_letter': center_letter,
    })

def clear_cache_view(request):
    keys_before = cache.keys('*')
    print("Cache keys before clear:", keys_before)
    cache.clear()
    print("Cache cleared")
    keys_after = cache.keys('*')
    print("Cache keys after clear:", keys_after)
    return HttpResponse("Cache cleared!")

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def daily_data_api_view(request):
    data, win_threshold, letters, center_letter = get_cached_daily_data()
    if data is None:
        return Response({"error": "Error fetching daily data"}, status=500)
    
    return Response({
        "data": data,
        "win_threshold": win_threshold,
        "letters": letters,
        "center_letter": center_letter
    })

@api_view(['POST'])
def reset_daily_data_view(request):
    data, win_threshold, letters, center_letter = reset_daily_data()
    return Response({
        "message": "Daily data reset successfully.",
        "data": data,
        "win_threshold": win_threshold,
        "letters": letters,
        "center_letter": center_letter
    })

@api_view(['GET'])
def infinite_data_view(request):
    data, win_threshold, letters, center_letter = make_subset()
    if data is None:
        return Response({"error": "Error generating infinite gameplay data"}, status=500)
    
    return Response({
        "data": data,
        "win_threshold": win_threshold,
        "letters": letters,
        "center_letter": center_letter
    })
