import requests
import sys

API_URL = 'http://127.0.0.1:8000/daily-data/reset-daily-data/'

def reset_daily_data():
    try:
        response = requests.post(API_URL)
        response.raise_for_status() 
        print("Daily data reset successfully.")
    except requests.exceptions.RequestException as e:
        print(f"Error resetting daily data: {e}")
        sys.exit(1)
        
if __name__ == "__main__":
    reset_daily_data()
