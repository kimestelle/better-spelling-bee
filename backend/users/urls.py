from django.urls import path
from .views import UserGetAPIView, UserCreateAPIView, UserUpdateAPIView
from django.conf import settings

urlpatterns = [
    path('get/', UserGetAPIView.as_view(), name="user-get"),
    path('post/', UserCreateAPIView.as_view(), name="user-create"),
    path('players/<int:user_id>/update-points/', UserUpdateAPIView.as_view(), name="user-update"),
]