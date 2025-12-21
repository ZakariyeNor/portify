from django.test import TestCase, override_settings
from django.contrib.auth.models import User
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient

from .models import Profile
from .serializers import ProfileSerializer

import io
import tempfile


def generate_image_file(name="test.jpg"):
    # Minimal JPEG header bytes to simulate an image upload
    return SimpleUploadedFile(name, b"\xff\xd8\xff\xe0" + b"0" * 10, content_type="image/jpeg")

@override_settings(MEDIA_ROOT=tempfile.gettempdir())
class ProfileTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="alice",
            password="password123",
            first_name="Alice",
            last_name="Doe",
            email="alice@example.com",
        )
        self.image = generate_image_file()
        self.profile = Profile.objects.create(user=self.user, image=self.image, intro="Hello world")

    def test_profile_str_returns_username_profile(self):
        # Should return a readable string representation for admin/debugging
        self.assertEqual(str(self.profile), "alice's Profile")

    def test_profile_serializer_reads_user_fields(self):
        # Serializer should expose user fields via source mapping
        data = ProfileSerializer(self.profile).data
        self.assertEqual(data["first_name"], "Alice")
        self.assertEqual(data["last_name"], "Doe")
        self.assertEqual(data["email"], "alice@example.com")
        self.assertIn("intro", data)
        self.assertIn("image", data)

    def test_profile_list_get_returns_serialized_profiles(self):
        # GET /api/profile/ should list profiles with correct fields
        url = reverse("profile")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        results = resp.json()
        # DRF ListAPIView returns list
        self.assertIsInstance(results, list)
        self.assertGreaterEqual(len(results), 1)
        item = results[0]
        self.assertEqual(item["first_name"], "Alice")
        self.assertEqual(item["last_name"], "Doe")
        self.assertEqual(item["email"], "alice@example.com")
        self.assertIn("intro", item)
        self.assertIn("image", item)

    def test_profile_create_post_without_user_fails_400(self):
        # POST should fail because serializer does not accept a user and model requires it
        url = reverse("profile")
        new_image = generate_image_file("pic.jpg")
        payload = {
            "intro": "New intro",
            "image": new_image,
        }
        resp = self.client.post(url, data=payload, format="multipart")
        # Expect 400 because user relation is required at model-level
        self.assertEqual(resp.status_code, 400)

    def test_profile_image_upload_path_prefix(self):
        # ImageField upload_to should prefix stored path with 'business_photo/'
        self.assertTrue(str(self.profile.image).startswith("business_photo/"))
