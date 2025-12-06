from django.shortcuts import render
from rest_framework import generics
from .models import Profile, Projects
from .serializers import ProfileSerializer, ProjectsSerializer
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
    permission_classes = [permissions.AllowAny]


# Profile detail 
class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'pk'
    permission_classes = [IsAdminOrOwner]


# Projects List and create
class ProjectsListCreate(generics.ListCreateAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    permission_classes = [IsAdminOrOwner]