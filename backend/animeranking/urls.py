# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('titles', views.get_titles_from_anilist, name='get_titles_from_anilist'),
    path('create_title', views.create_title, name='create_title'),
    # path('anime/', views.AnimeListCreateView.as_view(), name='anime-list-create'),
    # path('user-ranking/', views.UserAnimeRankingListCreateView.as_view(), name='user-ranking-list-create'),
]