from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Anime
from .models import UserAnimeList
from .models import Recommendation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}  # Hide the password field when serializing

class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = ('id', 'title', 'genre', 'synopsis', 'release_year')

class UserAnimeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnimeList
        fields = ('id', 'user', 'anime', 'ranking')

class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ('id', 'user', 'anime')
