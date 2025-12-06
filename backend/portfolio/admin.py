from django.contrib import admin
from .models import Profile

# Register Profile model in admin.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    search_fields = 'username'
    search_fields = ['username']
