import redis
from django.conf import settings
from django.utils import timezone
from .models import DailyData
import random, string, os, json
from django.core.cache import cache
from django.http import HttpResponse
from django.db import transaction

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

import logging

logger = logging.getLogger('better-spelling-bee')

def validate(words, letters, center_letter):
    dict = {}

    for letter in letters:
        dict[letter] = set()

    for word in words:
        for char in word:
            dict[char].add(word)

    return dict.get(center_letter)

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
        return None, 0, "", ""
        
    letters = generate_letters()
    if not letters:
        print("Failed to generate letters")
        return None, 0, "", ""
    
    center_letter = random.choice(letters)
    
    words = [line.strip() for line in open(file_path, 'r') if set(line.strip()).issubset(set(letters))]
    valid_words = validate(words, letters, center_letter)
    
    if len(valid_words) < 9:
        return make_subset()
    else:
        for word in valid_words:
            win_threshold += calculate_score(word, letters)
        return json.dumps(list(valid_words)), win_threshold, letters, center_letter

    
def generate_letters():
    pangram_path = os.path.join(os.path.dirname(__file__), 'data', 'pangrams.txt')
    if not os.path.exists(pangram_path):
        print(f"File not found: {pangram_path}")
        return None
    
    with open(pangram_path, 'r') as fp:
        lines = fp.readlines()
    pangram_line_no = random.randint(0, len(lines) - 1)
    selected_line = lines[pangram_line_no].strip()
    return list(set(selected_line)) if selected_line else []

def fetch_daily_data():
    """
    Fetch the daily data from an external source.
    This is a placeholder function; replace it with actual data fetching logic.
    """
    return make_subset()

def cache_daily_data():
    data, win_threshold, letters, center_letter = fetch_daily_data()
    if data is None:
        return None, 0, "", ""

    today = timezone.now().date()
    cache_key = f"daily_data:{today}"
    r.set(cache_key, data, ex=86400)  # Cache for 24 hours

    # Save data in the database
    try:
        with transaction.atomic():
            DailyData.objects.update_or_create(
                date=today,
                defaults={
                    'data': data,
                    'win_threshold': win_threshold,
                    'letters': letters,
                    'center_letter': center_letter
                }
            )
    except Exception as e:
        print(f"Error saving daily data: {e}")

    return data, win_threshold, letters, center_letter


def get_cached_daily_data():
    today = timezone.now().date()
    cache_key = f"daily_data:{today}"
    data = r.get(cache_key)


def get_cached_daily_data():
    today = timezone.now().date()
    cache_key = f"daily_data:{today}"
    data = r.get(cache_key)

    if data:
        try:
            daily_data = DailyData.objects.filter(date=today).last()
            if not daily_data:
                raise DailyData.DoesNotExist
            win_threshold = daily_data.win_threshold
            letters = daily_data.letters
            excluded_chars = set(string.punctuation + string.digits + " ")
            letters_array = [char for char in list(letters) if char not in excluded_chars]
            
            center_letter = daily_data.center_letter
            return data, win_threshold, letters_array, center_letter
        except DailyData.DoesNotExist:
            data, win_threshold, letters, center_letter = cache_daily_data()
            return data, win_threshold, letters, center_letter
    else:
        data, win_threshold, letters, center_letter = cache_daily_data()
        return data, win_threshold, letters, center_letter

    
def print_cache():
    cache_contents = []
    for key in cache.keys('*'):
        value = cache.get(key)
        cache_contents.append(f"Key: {key}, Value: {value}")

    cache_output = '\n'.join(cache_contents)

    print(cache_output)

    return HttpResponse("Cache contents printed to console")

def reset_daily_data():
    data, win_threshold, letters, center_letter = fetch_daily_data()

    today = timezone.now().date()
    cache_key = f"daily_data:{today}"
    r.set(cache_key, data, ex=86400) 

    try:
        DailyData.objects.update_or_create(
            date=today,
            defaults={
                'data': data,
                'win_threshold': win_threshold,
                'letters': letters,
                'center_letter': center_letter
            }
        )
    except Exception as e:
        print(f"Error resetting daily data: {e}")

    DailyData.objects.create(date=today, data=data, win_threshold=win_threshold, letters=letters, center_letter=center_letter)
    return data, win_threshold, letters, center_letter