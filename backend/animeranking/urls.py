# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('titles', views.get_titles_from_anilist,
         name='get_titles_from_anilist'),  # custom endpoint for getting anime titles

    # Custom endpoint for adding anime
    path('add-anime-to-list', views.add_anime_to_user_list),

    # custom endpoint to retrieve a user's anime list
    path('anime-list', views.get_anime_list),

    path('rank-anime', views.rank_anime),  # Custom endpoint for ranking anime


    # Custom endpoint for getting recommendations
    path('recommendations', views.get_recommendations),

    path('register', views.register_user,
         name='register_user'),  # create a user

    # attempt to login a user
    path('login', views.user_login, name='user_login')
]
