from django.shortcuts import render
from django.core.cache import cache

# Create your views here.
def cache_test_view(request): 
    # Store data in cache
    cache.set('my_cached_data', 'Hello, this is cached data!', timeout=300)  # Cache for 5 minutes (300 seconds)

    # Retrieve data from cache
    cached_data = cache.get('my_cached_data')

    # Print cached data to console
    print("Cached Data:", cached_data)

    return render(request, 'cache_test.html', {'cached_data': cached_data})