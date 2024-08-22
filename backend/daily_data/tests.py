from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class InfiniteDataAPITestCase(APITestCase):

    def setUp(self):
        # Create a user and obtain a JWT token for the user
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)

    def test_infinite_data_view(self):
        # URL of the infinite data view
        url = reverse('infinite_data_view')

        # Include the Authorization header with the JWT token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # First request to the endpoint
        response1 = self.client.get(url)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)

        # Store the data from the first response
        data1 = response1.data['data']

        # Second request to the endpoint
        response2 = self.client.get(url)
        self.assertEqual(response2.status_code, status.HTTP_200_OK)

        # Store the data from the second response
        data2 = response2.data['data']

        # Check that the data from the two requests is different
        self.assertNotEqual(data1, data2, "The data returned by the API should be different for each request.")
