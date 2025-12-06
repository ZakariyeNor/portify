from django.contrib import admin
from .models import Profile, Projects, Tech

# Register Profile model in admin.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    search_fields = 'username'
    search_fields = ['username']

# Create an Admin class for Projects to customize its appearance
@admin.register(Projects)
class ProjectsAdmin(admin.ModelAdmin):
    filter_horizontal = ('tech', 'main_tech',) 
    list_display = ('name', 'created_at',)

# Register the tech
admin.site.register(Tech)