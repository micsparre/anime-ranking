# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('anime/', views.AnimeListCreateView.as_view(), name='anime-list-create'),
    path('user-ranking/', views.UserAnimeRankingListCreateView.as_view(), name='user-ranking-list-create'),
]