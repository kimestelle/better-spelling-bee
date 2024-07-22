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

def is_pangram(word, letters):
    return set(word) == set(letters)

def calculate_score(word, letters):
    if len(word) == 4:
        return 1
    elif len(word) == 5:
        return 5
    elif len(word) == 7 and is_pangram(word, letters):
        return 14
    else:
        return len(word)

def make_subset():
    global win_threshold
    win_threshold = 0
    
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'cleaned.txt')
    
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return None, 0

    letters = random.sample(list(string.ascii_lowercase), 7)
        
    words = [line.strip() for line in open(file_path, 'r') if set(line.strip()).issubset(letters)]
    
    if len(validate(words, letters)) < 9:
        return make_subset()
    else: 
        for word in words:
            win_threshold += calculate_score(word, letters)
        return json.dumps(list(validate(words, letters))), win_threshold

def fetch_daily_data():
    """
    Fetch the daily data from an external source.
    This is a placeholder function; replace it with actual data fetching logic.
    """
    return make_subset()

def cache_daily_data():
    """
    Fetch data and cache it in Redis.
    """
    data, win_threshold = fetch_daily_data()
    if data is None:
        return None, 0

    today = timezone.now().date()
    cache_key = f"daily_data:{today}"
    r.set(cache_key, data, ex=86400)  # Cache for 24 hours

    # Save data in the database
    DailyData.objects.create(date=today, data=data, win_threshold=win_threshold)
    return data, win_threshold

def get_cached_daily_data():
    """
    Retrieve the cached daily data.
    """
    today = timezone.now().date()
    cache_key = f"daily_data:{today}"
    data = r.get(cache_key)

    if data:
        try:
            daily_data = DailyData.objects.get(date=today)
            win_threshold = daily_data.win_threshold
            return data, win_threshold
        except DailyData.DoesNotExist:
            data, win_threshold = cache_daily_data()
            return data if data else None, win_threshold
    else:
        data, win_threshold = cache_daily_data()
        return data if data else None, win_threshold
    
def print_cache():
    cache_contents = []
    for key in cache.keys('*'):
        value = cache.get(key)
        cache_contents.append(f"Key: {key}, Value: {value}")

    cache_output = '\n'.join(cache_contents)

    print(cache_output)

    return HttpResponse("Cache contents printed to console")
