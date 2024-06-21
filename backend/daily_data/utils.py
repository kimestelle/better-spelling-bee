import redis
from django.conf import settings
from django.utils import timezone
from .models import DailyData
import random, string, os, json
from django.core.cache import cache
from django.http import HttpResponse

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

def validate(words, letters):
    dict = {}

    for letter in letters:
        dict[letter] = set()

    for word in words:
        for char in word:
            dict[char].add(word)
    
    max_key = letters[0]

    for k, v in dict.items():
        if len(v) > len(dict[max_key]):
            max_key = k

    return dict[max_key]

def make_subset(input_file):
    if os.path.exists(input_file) == False:
        print(f"File not found: {input_file}")

    letters = random.sample(list(string.ascii_lowercase), 7) + ['\n']

    file_path = os.path.join(os.path.dirname(__file__), 'data', 'cleaned.txt')
        
    words = [line[:-1] for line in open(file_path, 'r') if set(line).issubset(letters)]
    
    if len(validate(words, letters)) < 9:
        make_subset(input_file)
    else: 
        return json.dumps(list(validate(words, letters)))


def fetch_daily_data():
    """
    Fetch the daily data from an external source.
    This is a placeholder function; replace it with actual data fetching logic.
    """

    return make_subset('cleaned.txt')

def cache_daily_data():
    """
    Fetch data and cache it in Redis.
    """
    data = fetch_daily_data()
    # data = make_subset('cleaned.txt')
    today = timezone.now().date()
    cache_key = f"daily_data:{today}"
    r.set(cache_key, data, ex=86400)  # Cache for 24 hours

    # Save data in the database
    DailyData.objects.create(date=today, data=data)

def get_cached_daily_data():
    """
    Retrieve the cached daily data.
    """
    today = timezone.now().date()
    cache_key = f"daily_data:{today}"
    data = r.get(cache_key)

    if data:
        return data.decode('utf-8')
    else:
        # If data is not found in the cache, fetch and cache it
        cache_daily_data()
        return r.get(cache_key).decode('utf-8')
    
def print_cache():
    cache_contents = []
    for key in cache.keys('*'):
        value = cache.get(key)
        cache_contents.append(f"Key: {key}, Value: {value}")

    cache_output = '\n'.join(cache_contents)

    print(cache_output)

    return HttpResponse("Cache contents printed to console")