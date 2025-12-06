from django.urls import path
from .. import views


urlpatterns = [
    # Profile
    path("profile/", views.ProfileList.as_view(), name='profile'),
    path("profile/<int:pk>/", views.ProfileDetail.as_view(), name='profile_details'),
    
    # Projects
    path("projects/", views.ProjectsListCreate.as_view(), name='projects-list'),
    path("projects/<int:pk>/", views.ProjectsDetail.as_view(), name='projects-details'),
]