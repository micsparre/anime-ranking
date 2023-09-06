# appname/views.py

from rest_framework import generics
from .models import Anime, UserAnimeRanking
from .serializers import AnimeSerializer, UserAnimeRankingSerializer

class AnimeListCreateView(generics.ListCreateAPIView):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer

class UserAnimeRankingListCreateView(generics.ListCreateAPIView):
    queryset = UserAnimeRanking.objects.all()
    serializer_class = UserAnimeRankingSerializer
