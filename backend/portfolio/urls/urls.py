from django.urls import path
from .. import views


urlpatterns = [
    # Profile
    path("profile/", views.ProfileList.as_view(), name='profile'),
    path("profile/<int:pk>/", views.ProfileDetail.as_view(), name='profile_details'),
    
    # Projects
    path("projects/", views.ProjectsListCreate.as_view(), name='projects-list'),
    path("projects/<int:pk>/", views.ProjectsDetail.as_view(), name='projects-details'),
    
    # Unified skillsdata endpoint
    path('unified/', views.UnifiedSkillsData.as_view(), name='unified-Skillsdata'),
    
    # Education
    path('educations/', views.EductationListCreate.as_view(), name='education-list'),
    path('educations/<int:pk>/', views.EductationDetails.as_view(), name='Education-details'),
    
    # Categories
    path('categories/', views.CategoriesListCreate.as_view(), name='categories-list'),
    path('categories/<int:pk>/', views.CategoriesDetails.as_view(), name='categories-details'),
    
    # Skills
    path('skills/', views.SkillListCreate.as_view(), name='skills-list'),
    path('skills/<int:pk>/', views.SkillDetails.as_view(), name='skill-details'),
    
    
]

