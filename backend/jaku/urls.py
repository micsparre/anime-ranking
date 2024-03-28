# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("titles", views.get_titles_from_api, name="get_titles_from_api"),
    path("rankings", views.get_rankings),
    path("rank-item", views.rank_item),
    path("recommendations", views.get_recommendations),
    path("register", views.register_user, name="register_user"),
    path("get-username", views.get_username, name="get_username"),
    path(
        "rm-rankings-item",
        views.remove_rankings_item,
    ),
    path("user", views.get_user_info, name="get_user_info"),
    path("bookmarks", views.get_bookmarks, name="get_bookmarks"),
    path("add-bookmark", views.add_bookmark, name="add_bookmark"),
    path("rm-bookmark", views.remove_bookmark, name="remove_bookmark"),
    path("login", views.user_login, name="user_login"),
]
