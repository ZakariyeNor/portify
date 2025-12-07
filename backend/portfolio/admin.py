from django.contrib import admin
from .models import (
    Profile, Projects, Tech,
    Education, SkillCategory, Skill,
    Certificate, Contact, Visons
)

# --- Register Profile model in admin. ---
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    search_fields = 'username'
    search_fields = ['username']

# --- Create an Admin class for Projects to customize its appearance ---
@admin.register(Projects)
class ProjectsAdmin(admin.ModelAdmin):
    filter_horizontal = ('tech', 'main_tech',) 
    list_display = ('name', 'created_at',)

# --- Register the tech ---
@admin.register(Tech)
class TechAdmin(admin.ModelAdmin):
    list_display = ("get_name_display",)
    search_fields = ("name", "slug")
    ordering = ("name",)


# --- EDUCATION ---
@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("course", "school", "end_date")
    search_fields = ("course", "school")
    list_filter = ("school",)
    ordering = ("course",)


# --- SKILLS (INLINE FOR CATEGORY) ---
class SkillInline(admin.TabularInline):
    model = Skill
    extra = 2
    min_num = 1
    ordering = ("name",)


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)
    list_filter = ("title",)
    ordering = ("title",)
    inlines = [SkillInline]


# --- SKILL (STANDALONE) ---
@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category")
    search_fields = ("name", "category__title")
    list_filter = ("category",)
    ordering = ("category__title", "name")


# --- CERTIFICATE ---
@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)

# --- Contacts ---
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    list_filter = ['created_at']

# --- Visions ---
@admin.register(Visons)
class VisionsAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    list_filter = ('updated_at',)
    ordering = ("title",)