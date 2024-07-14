from django.urls import path
from . import views
from .views import clear_cache_view

urlpatterns = [
    path('cache-test/', views.cache_test_view, name='cache_test_view'),
    path('daily-data/', views.daily_data_view, name='daily_data_view'),
    path('clear-cache/', clear_cache_view, name='clear_cache'),
]