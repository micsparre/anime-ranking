# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('titles', views.get_titles_from_anilist, name='get_titles_from_anilist'),
    # path('create_title', views.create_title, name='create_title'),
    path('add-anime-to-list', views.add_anime_to_user_list),  # Custom endpoint for adding anime
    path('rank-anime', views.rank_anime),  # Custom endpoint for ranking anime
    path('get-recommendations', views.get_recommendations),  # Custom endpoint for getting recommendations
    path('register', views.register_user, name='register_user'), # create a user
    path('login', views.user_login, name='user_login') # attempt to login a user
    # path('anime/', views.AnimeListCreateView.as_view(), name='anime-list-create'),
    # path('user-ranking/', views.UserAnimeRankingListCreateView.as_view(), name='user-ranking-list-create'),
]