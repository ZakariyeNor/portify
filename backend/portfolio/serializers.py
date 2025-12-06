from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
class ProfileSerializer(serializers.ModelSerializer):
    # Expose User fields
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'email', 'intro', 'image']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        
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
