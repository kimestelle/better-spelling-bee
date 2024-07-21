from django.urls import path
from .views import CustomTokenObtainPairView, CustomTokenRefreshView, RegisterView, UserListView, CurrentUserView, favicon_view

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('', UserListView.as_view(), name='user-list'),
    path('favicon.ico', favicon_view),
]

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)