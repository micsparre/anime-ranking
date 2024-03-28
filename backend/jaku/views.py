# jaku/views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .api_integration import fetch_titles, get_anime_obj
from rest_framework.permissions import IsAuthenticated
from .models import Rankings, UserProfile, Bookmarks
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from .openai_api import get_recommendations_as_list
from .utils import sort_titles
import logging


@api_view(["GET"])
def get_titles_from_api(request):
    """
    Returns a list of anime titles from the third-party API.
    """
    # Get the 'title' query parameter from the request
    title_query = request.query_params.get("title", None)
    filtered_data = []
    if title_query is not None:
        # Call the function to fetch data from the third-party API
        external_data = fetch_titles(title_query)
        for item in external_data:
            # Filter out titles with no English translation and low popularity
            if (
                item.get("title").get("english") is not None
                and item.get("popularity", 0) > 30000
            ):
                filtered_data.append(
                    {
                        "title": item.get("title").get("english"),
                        "id": item.get("id"),
                        "episodes": item.get("episodes"),
                        "start_date": item.get("startDate").get("year"),
                        "end_date": item.get("endDate").get("year"),
                    }
                )
    sorted_titles = sort_titles(filtered_data, title_query)
    return Response(sorted_titles, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_rankings(request):
    """
    Returns a list of user's Rankings.
    """
    user = request.user.userprofile
    user_anime_list = Rankings.objects.filter(user=user)
    user_anime_list_data = []
    for item in user_anime_list:
        start_date = (
            item.anime.start_date.strftime("%Y") if item.anime.start_date else None
        )
        end_date = item.anime.end_date.strftime("%Y") if item.anime.end_date else None
        user_anime_list_data.append(
            {
                "title": item.anime.title,
                "id": item.anime.id,
                "episodes": item.anime.episodes,
                "start_date": start_date,
                "end_date": end_date,
                "ranking": item.ranking,
            }
        )
    return Response(user_anime_list_data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_bookmarks(request):
    """
    Returns a list of user's Bookmarks.
    """
    user = request.user.userprofile
    user_bookmarks = Bookmarks.objects.filter(user=user)
    data = []
    for item in user_bookmarks:
        start_date = (
            item.anime.start_date.strftime("%Y") if item.anime.start_date else None
        )
        end_date = item.anime.end_date.strftime("%Y") if item.anime.end_date else None
        data.append(
            {
                "title": item.anime.title,
                "id": item.anime.id,
                "episodes": item.anime.episodes,
                "start_date": start_date,
                "end_date": end_date,
            }
        )
    return Response(data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_recommendations(request):
    """
    Returns a list of Anime objects recommended for the user.
    """
    user = request.user.userprofile
    user_anime_list = Rankings.objects.filter(user=user)
    user_bookmarks = Bookmarks.objects.filter(user=user)
    ranked_titles, bookmark_titles, user_ids = set(), set(), set()
    for item in user_anime_list:
        ranked_titles.add(item.anime.title)
        user_ids.add(item.anime.id)
    for bookmark in user_bookmarks:
        bookmark_titles.add(bookmark.anime.title)
        user_ids.add(bookmark.anime.id)
    recommendations = get_recommendations_as_list(ranked_titles, bookmark_titles)
    data = []
    recs_count = 0
    for rec in recommendations:
        response_data = fetch_titles(rec)
        if response_data:
            item = response_data[0]
        else:
            print(f"couldn't find tv show for: {rec}")
            continue
        # don't recommend shows already in the user's ranked/bookmarked lists
        if item.get("id") in user_ids:
            continue
        if item.get("title").get("english") is not None:
            data.append(
                {
                    "title": item.get("title").get("english"),
                    "id": item.get("id"),
                    "episodes": item.get("episodes"),
                    "start_date": item.get("startDate").get("year"),
                    "end_date": item.get("endDate").get("year"),
                }
            )
            recs_count += 1
            if recs_count == 8:
                break
    return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def rank_item(request):
    """
    Updates the ranking of an anime item in the user's Rankings.
    """
    user = request.user.userprofile

    ranking_list = request.data
    print(ranking_list)
    for item in ranking_list:
        item_id = item.get("item_id")
        ranking = item.get("ranking")
        if not item_id or not ranking:
            return Response(
                {"message": "item_id and ranking are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user_anime = Rankings.objects.get(user=user, anime__id=item_id)
            user_anime.ranking = ranking
            user_anime.save()
        except Rankings.DoesNotExist:
            anime_obj = get_anime_obj(item_id)
            user_anime = Rankings(user=user, anime=anime_obj, ranking=ranking)
            user_anime.save()

        if Bookmarks.objects.filter(user=user, anime__id=item_id).exists():
            user_bookmark = Bookmarks.objects.get(user=user, anime__id=item_id)
            user_bookmark.delete()

    return Response({"message": "Anime ranking updated"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_rankings_item(request):
    """
    Removes an anime from the user's Rankings.
    """
    user = request.user.userprofile

    item_id = request.data.get("item_id")
    if not item_id:
        return Response(
            {"message": "item_id is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user_anime = Rankings.objects.get(user=user, anime__id=item_id)
        user_anime.delete()
        return Response(
            {"message": "Anime removed from the user's list"}, status=status.HTTP_200_OK
        )
    except Rankings.DoesNotExist:
        return Response(
            {"message": "Anime not found in the user's list"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_bookmark(request):
    """
    Adds an Anime object to the user's Bookmarks.
    """
    user = request.user.userprofile
    item_id = request.data.get("item_id")
    if not item_id:
        return Response(
            {"message": "item_id is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    # Check if the anime is not already in the user's list
    if Bookmarks.objects.filter(user=user, anime__id=item_id).exists():
        return Response(
            {"message": "Anime is already bookmarked"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    anime_obj = get_anime_obj(item_id)

    # Create a new entry in the Rankings
    user_bookmark = Bookmarks(user=user, anime=anime_obj)
    user_bookmark.save()

    if Rankings.objects.filter(user=user, anime__id=item_id).exists():
        user_anime = Rankings.objects.get(user=user, anime__id=item_id)
        user_anime.delete()

    return Response({"message": "Anime bookmarked"}, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_bookmark(request):
    """
    Removes an Anime Object from the user's bookmarks.
    """
    user = request.user.userprofile

    item_id = request.data.get("item_id")
    if not item_id:
        return Response(
            {"message": "item_id is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user_bookmark = Bookmarks.objects.get(user=user, anime__id=item_id)
        user_bookmark.delete()
        return Response(
            {"message": "Anime removed from bookmarks"}, status=status.HTTP_200_OK
        )
    except Bookmarks.DoesNotExist:
        return Response(
            {"message": "Anime not found in bookmarks"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["POST"])
def register_user(request):
    """
    Creates a new user.
    """
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    # Validate input data
    if not username or not password or not email or not first_name or not last_name:
        return Response(
            {
                "message": "First name, last name, username, password, and email are required."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create a new user
    try:
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            email=email,
        )
        user.save()

        # Optionally, create a UserProfile entry for additional user-related data
        user_profile = UserProfile(user=user)
        user_profile.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def user_login(request):
    """
    Attempts to login a user.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    # Authenticate the user
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        # Create or retrieve an authentication token
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"message": "Invalid username or password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )


@api_view(["GET"])
def get_username(request):
    """
    Checks if a username is already taken.
    """
    username = request.query_params.get("username", None)
    if not username:
        return Response(
            {"message": "username parameter is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(username=username).exists():
        return Response({"exists": True}, status=status.HTTP_200_OK)
    else:
        return Response({"exists": False}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    """
    Returns the user's profile data.
    """
    user = request.user.userprofile
    return Response(
        {
            "username": user.user.username,
            "first_name": user.user.first_name,
            "last_name": user.user.last_name,
            "email": user.user.email,
        },
        status=status.HTTP_200_OK,
    )
