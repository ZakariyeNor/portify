from django.shortcuts import render
from rest_framework import generics, viewsets

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    Profile, Projects, Education,
    SkillCategory, Skill, Certificate,
    Contact, Visons
)
from .serializers import (
    ProfileSerializer, ProjectsSerializer,
    EducationSerializer, SkillCategorySerializer,
    SkillSerializer, CertificateSerializer, ContactSerializer,
    VisionsSerializer
)

from .permissions import IsAdminOrOwner
from rest_framework import permissions

from rest_framework import status
from .tasks import send_contact_email
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
class CategoriesListCreate(generics.ListCreateAPIView):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
    permission_classes = [IsAdminOrOwner]


# Categories update and delete
class CategoriesDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'


# Skill List and create
class SkillListCreate(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrOwner]


# Skill update and delete
class SkillDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'


# Certivicate List and create
class CertificateListCreate(generics.ListCreateAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [IsAdminOrOwner]

# Certivicate update and delete
class CertificateDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'


# Contact endpoint
class ContactView(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOwner]
    
    def get_permissions(self):
        """
            Allow unauthenticated users to send contacts form
        """
        if self.action == "create":
            return [permissions.AllowAny()]
        return super().get_permissions()
    
    # serialize contatct data
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.save()
        
        # Dispatch Celery task
        send_contact_email.delay(
            name=contact.name,
            email=contact.email,
            subject=contact.subject,
            message=contact.message,
            contact_id=contact.id,
        )
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# Visions model
class VisionView(viewsets.ModelViewSet):
    queryset = Visons.objects.all()
    serializer_class = VisionsSerializer
    permission_classes = [IsAdminOrOwner]