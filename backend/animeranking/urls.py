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

    path('get-username', views.get_username,
         name='get_username'),  # check if username exists

    path("remove-anime-from-list", views.remove_anime_from_user_list),

    path("get-user-info", views.get_user_info, name="get_user_info"),

    path("bookmarks", views.get_bookmarks, name="get_bookmarks"),
    
    path("add-bookmark", views.add_bookmark, name="add_bookmark"),
    
    path("remove-bookmark", views.remove_bookmark, name="remove_bookmark")

    # attempt to login a user
    path('login', views.user_login, name='user_login')
]
