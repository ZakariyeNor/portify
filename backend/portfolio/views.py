from django.shortcuts import render
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    Profile, Projects, Education,
    SkillCategory, Skill, Certificate
)
from .serializers import (
    ProfileSerializer, ProjectsSerializer,
    EducationSerializer, SkillCategorySerializer,
    SkillSerializer, CertificateSerializer
)

from .permissions import IsAdminOrOwner
from rest_framework import permissions

# Hidden landing page
def landing_api(request):
    return render(
        request,
        'landing/front.html',
    )

# Profile api view
class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrOwner]


# Profile detail 
class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticated]


# Projects List and create
class ProjectsListCreate(generics.ListCreateAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    permission_classes = [IsAdminOrOwner]


# Projects detail
class ProjectsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    permission_classes = [IsAdminOrOwner]
    lookup_field = 'pk'

"""
    Skills page views & individual CRUD endpoints 
    for Education, Skill, SkillCategory, and Certificates
    + Permissions
"""

# Skills page unified api endpoint
class UnifiedSkillsData(APIView):
    """
    Returns all skills data in a single response:
    - Educations
    - Certificates
    - Skill Categories with nested Skills
    """
    serializer_class = None
    permission_classes = [IsAdminOrOwner]  
    def get(self, request):
        data = {
            "education": EducationSerializer(
                Education.objects.all(), many=True
            ).data,
            "skill_categories": SkillCategorySerializer(
                SkillCategory.objects.all(), many=True
            ).data,
            "certificates": CertificateSerializer(
                Certificate.objects.all(), many=True
            ).data
        }
        
        return Response(data)

# Education List and create
class EductationListCreate(generics.ListCreateAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsAdminOrOwner]

# Education update and delete
class EductationDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'


# Categories List and create
# Categories update and delete

# Skill List and create
# Skill update and delete

# Certivicate List and create
# Certivicate update and delete