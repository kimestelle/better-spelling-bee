from django.shortcuts import render
from django.core.cache import cache
from .daily_data.utils import get_cached_daily_data, print_cache
from django.http import HttpResponse

# Create your views here.
def cache_test_view(request): 
    # Store data in cache
    cache.set('my_cached_data', 'Hello, this is cached data!', timeout=300)  # Cache for 5 minutes (300 seconds)

    # Retrieve data from cache
    cached_data = cache.get('my_cached_data')

    # Print cached data to console
    print("Cached Data:", cached_data)

    return render(request, 'cache_test.html', {'cached_data': cached_data})

def daily_data_view(request):
    data = get_cached_daily_data()
    print(data)
    return render(request, 'daily_data.html', {'data': data})

def clear_cache_view(request):
    keys_before = cache.keys('*')
    print("Cache keys before clear:", keys_before)

    # Clear the cache
    cache.clear()
    print("Cache cleared")

    # Print cache keys after clearing
    keys_after = cache.keys('*')
    print("Cache keys after clear:", keys_after)

    return HttpResponse("Cache cleared!")