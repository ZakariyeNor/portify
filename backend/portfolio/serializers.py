from rest_framework import serializers
from .models import (
    Profile, Projects, Tech,
    Education, SkillCategory, Skill,
    Certificate
)
from django.contrib.auth.models import User

""" Profile serializer """
class ProfileSerializer(serializers.ModelSerializer):
    # Expose User fields
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'email', 'intro', 'image']
        
    # create a new user object
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user, created = User.objects.get_or_create(
            email=user_data['email'],
            defaults={
                'first_name': user_data.get('first_name', ''),
                'last_name': user_data.get('last_name', ''),
                'username': user_data.get('email'),
            }
        )
        profile, created = Profile.objects.get_or_create(user=user, defaults=validated_data)
        return profile

    # Update existing one
    def update(self, instance, validated_data):
        # Extract nested user data
        user_data = validated_data.pop('user', {})

        # Update User fields
        instance.user.first_name = user_data.get('first_name', instance.user.first_name)
        instance.user.last_name = user_data.get('last_name', instance.user.last_name)
        instance.user.email = user_data.get('email', instance.user.email)
        instance.user.save()

        # Update Profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

""" Projects serializer """
class ProjectsSerializer(serializers.ModelSerializer):
    tech = serializers.SlugRelatedField(
        queryset=Tech.objects.all(),
        many=True,
        slug_field='name',
    )
    main_tech = serializers.SlugRelatedField(
        queryset=Tech.objects.all(),
        many=True,
        slug_field='name',
    )

    class Meta:
        model = Projects
        fields = ['name', 'intro', 'docs', 'image', 'tech', 'main_tech']

""" Skills serializers """

# Education serializer
class EducationSerializer(serializers.ModelSerializer):
    period = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Education
        fields = ['id', 'course', 'school', 'start_date', 'end_date', 'period']

    def get_period(self, obj):
        return f"{obj.start_date} - {obj.end_date}"

# Skill serializers
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name']

# Skill category serializers
class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    class Meta:
        model = SkillCategory
        fields = ['id', 'title', 'skills']


# Certificate serializers
class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['name', 'image', 'resume']