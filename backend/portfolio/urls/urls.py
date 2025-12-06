from django.urls import path
from .. import views


urlpatterns = [
    # Profile
    path("profile/", views.ProfileList.as_view(), name='profile'),
    path("profile/<int:pk>/", views.ProfileDetail.as_view(), name='profile_details'),
]