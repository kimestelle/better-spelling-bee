from django.urls import path
from .views import RegisterView, UserListView, CurrentUserView, DailyLeaderboardView, TotalLeaderboardView, favicon_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('leaderboard/daily', DailyLeaderboardView.as_view(), name='daily-leaderboard'),
    path('leaderboard/total', TotalLeaderboardView.as_view(), name='total-leaderboard'),
    path('', UserListView.as_view(), name='user-list'),

    path('favicon.ico', favicon_view),
]

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)