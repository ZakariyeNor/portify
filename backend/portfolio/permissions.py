from rest_framework import permissions

class IsAdminOrOwner(permissions.BasePermission):
    # Admin or owner only
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff or request.user.is_superuser:
            return True
        return obj == request.user