from django.urls import path
from . import views

urlpatterns = [
    path('cache-test/', views.cache_test_view, name='cache_test_view'),
]