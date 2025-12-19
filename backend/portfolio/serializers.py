from rest_framework import serializers
from .models import (
    Profile, Projects, Tech,
    Education, SkillCategory, Skill,
    Certificate, Contact, Visions,
    Principle, LongTerm
)
from django.contrib.auth.models import User

""" Profile serializer """
class ProfileSerializer(serializers.ModelSerializer):
    # Expose User fields
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'email', 'intro', 'image']
        
    # Get image url
    def get_image(self, obj):
        if obj.image:
            return obj.image.build_url()
        return None
        
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
    image = serializers.SerializerMethodField()
    
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
        fields = [
            'id', 'name', 'intro', 'docs', 'image',
            'category', 'tech', 'main_tech', 'live_url',
            'source_code', 'created_at'
        ]
    
    # Get image url
    def get_image(self, obj):
        if obj.image:
            return obj.image.build_url()
        return None

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
    category_name = serializers.PrimaryKeyRelatedField(
        queryset=SkillCategory.objects.all(), write_only=True
    )
    category = serializers.StringRelatedField(read_only=True)  # show category name

    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'category_name']

    def create(self, validated_data):
        category = validated_data.pop('category_name')
        return Skill.objects.create(category=category, **validated_data)

    def update(self, instance, validated_data):
        category = validated_data.pop('category_name', None)
        if category:
            instance.category = category
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

# SkillCategorySerializer (nested skills for unified view)
class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)  # uses SkillSerializer

    class Meta:
        model = SkillCategory
        fields = ['id', 'title', 'skills']


# Certificate serializers
class CertificateSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    resume = serializers.SerializerMethodField()
    
    class Meta:
        model = Certificate
        fields = ['id', 'name', 'image', 'resume', 'about']

    # Get image url
    def get_image(self, obj):
        if obj.image:
            return obj.image.build_url()
        return None
    
    # Get resume url
    def get_resume(self, obj):
        if obj.resume:
            return obj.resume.build_url()
        return None

""" Contact """
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            'id', 'name', 'subject', 'email', 'message'
        ]

        
""" Visions """
class PrincipleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Principle
        fields = ['id', 'key', 'title', 'content']

class LongTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = LongTerm
        fields = ['id', 'year', 'plan', 'description']

class VisionSerializer(serializers.ModelSerializer):
    principles_list = PrincipleSerializer(many=True, read_only=True)
    long_term_list = LongTermSerializer(many=True, read_only=True)

    class Meta:
        model = Visions
        fields = ['id', 'title', 'sub_title', 'vision_intro', 'principles_title', 'longterm_title', 'principles_list', 'long_term_list']