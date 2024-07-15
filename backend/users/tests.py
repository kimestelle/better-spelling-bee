from django.test import TestCase
from django.contrib.auth.models import User
from .models import Player

class PlayerModelTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.player = Player.objects.create(user=self.user, points=10)

    def test_player_creation(self):
        self.assertEqual(self.player.user.username, 'testuser')
        self.assertEqual(self.player.points, 10)
