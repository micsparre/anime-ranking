# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('titles', views.get_titles_from_anilist,
         name='get_titles_from_anilist'),

    path('add-anime-to-list', views.add_anime_to_user_list),

    path('anime-list', views.get_anime_list),

    path('rank-anime', views.rank_anime),

    path('recommendations', views.get_recommendations),

    path('register', views.register_user,
         name='register_user'),

    path('get-username', views.get_username,
         name='get_username'),

    path("remove-anime-from-list", views.remove_anime_from_user_list),

    path("user", views.get_user_info, name="get_user_info"),

    path("bookmarks", views.get_bookmarks, name="get_bookmarks"),

    path("add-bookmark", views.add_bookmark, name="add_bookmark"),

    path("remove-bookmark", views.remove_bookmark, name="remove_bookmark"),

    path('login', views.user_login, name='user_login')
]
