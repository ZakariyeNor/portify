from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse
from django.db import connection


# Health check endpoint for Railway
def health_check(request):
    try:
        # Check database connectivity
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        return JsonResponse({
            "status": "healthy",
            "service": "portify-backend",
            "database": "connected"
        })
    except Exception as e:
        return JsonResponse({
            "status": "unhealthy",
            "service": "portify-backend",
            "error": str(e)
        }, status=503)


# Swagger
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
         title="Personal Portfolio API",
        default_version='v1',
        description="Personal Portfolio API documentation",
        terms_of_service="https://www.apiauth.com/terms/",
        contact=openapi.Contact(email="support@authapi.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.IsAuthenticated],
)


urlpatterns = [
    # Main admin
    path('admin/', admin.site.urls),
    
    # Portfolio app
    path('', include('portfolio.urls.landing')),
    path('api/', include('portfolio.urls.urls')),

    # Swagger
    
    # for machines or tools
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    
    # for  Redoc docs and swagger UI
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]
