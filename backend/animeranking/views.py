# animeranking/views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .api_integration import fetch_anime_titles, fetch_anime_obj
from rest_framework.permissions import IsAuthenticated
from .models import UserAnime, UserProfile, UserBookmarks
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from .openai import get_recommendations_as_list


@api_view(['GET'])
def get_titles_from_anilist(request):
    """
    Returns a list of anime titles from the third-party API.
    """
    # Get the 'title' query parameter from the request
    title_query = request.query_params.get('title', None)
    filtered_data = []
    if title_query is not None:
        # Call the function to fetch data from the third-party API
        external_data = fetch_anime_titles(title_query)
        for item in external_data:
            if item.get('title').get('english') is not None:
                filtered_data.append(
                    {'id': item.get('id'), 'title': item.get('title').get('english'), 'start_date': item.get('startDate').get('year'), 'end_date': item.get('endDate').get('year'), 'episodes': item.get('episodes')})
    return Response(filtered_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_anime_list(request):
    """
    Returns a list of anime titles from the user's list.
    """
    user = request.user.userprofile
    user_anime_list = UserAnime.objects.filter(user=user)
    user_anime_list_data = []
    for item in user_anime_list:
        start_date = item.anime.start_date.strftime(
            '%Y') if item.anime.start_date else None
        end_date = item.anime.end_date.strftime(
            '%Y') if item.anime.end_date else None
        user_anime_list_data.append(
            {'id': item.anime.id, 'title': item.anime.title, 'ranking': item.ranking, 'start_date': start_date, 'end_date': end_date, 'episodes': item.anime.episodes})
    return Response(user_anime_list_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_anime_to_user_list(request):
    """
    Adds an anime to the user's list.
    """
    # Assuming you have a UserProfile model associated with the user
    user = request.user.userprofile

    # Get the anime_id from the request data
    anime_id = request.data.get('anime_id')
    if not anime_id:
        return Response({'message': 'anime_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the anime is not already in the user's list
    if UserAnime.objects.filter(user=user, anime__id=anime_id).exists():
        return Response({'message': 'Anime is already in the user\'s list'}, status=status.HTTP_400_BAD_REQUEST)
    anime_obj = fetch_anime_obj(anime_id)

    ranking = 10  # Set the default ranking to 10 TODO: get from client

    # Create a new entry in the UserAnime
    user_anime = UserAnime(user=user, anime=anime_obj, ranking=ranking)
    user_anime.save()

    if UserBookmarks.objects.filter(user=user, anime__id=anime_id).exists():
        user_bookmark = UserBookmarks.objects.get(
            user=user, anime__id=anime_id)
        user_bookmark.delete()

    return Response({'message': 'Anime added to the user\'s list'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rank_anime(request):
    """
    Updates the ranking of an anime title in the user's list.
    """
    user = request.user.userprofile

    ranking_list = request.data
    print(ranking_list)
    for item in ranking_list:
        anime_id = item.get('anime_id')
        ranking = item.get('ranking')
        if not anime_id or not ranking:
            return Response({'message': 'anime_id and ranking are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_anime = UserAnime.objects.get(user=user, anime__id=anime_id)
            user_anime.ranking = ranking
            user_anime.save()
        except UserAnime.DoesNotExist:
            anime_obj = fetch_anime_obj(anime_id)
            user_anime = UserAnime(user=user, anime=anime_obj, ranking=ranking)
            user_anime.save()

    return Response({'message': 'Anime ranking updated'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register_user(request):
    """
    Creates a new user.
    """
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    # Validate input data
    if not username or not password or not email or not first_name or not last_name:
        return Response({'message': 'First name, last name, username, password, and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new user
    try:
        user = User.objects.create_user(
            first_name=first_name, last_name=last_name, username=username, password=password, email=email)
        user.save()

        # Optionally, create a UserProfile entry for additional user-related data
        user_profile = UserProfile(user=user)
        user_profile.save()

        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_login(request):
    """
    Attempts to login a user.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate the user
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        # Create or retrieve an authentication token
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'username': user.username}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def get_username(request):
    """
    Checks if a username is already taken.
    """
    username = request.query_params.get('username', None)
    if not username:
        return Response({'message': 'username parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'exists': True}, status=status.HTTP_200_OK)
    else:
        return Response({'exists': False}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_anime_from_user_list(request):
    """
    Removes an anime from the user's list.
    """
    user = request.user.userprofile

    anime_id = request.data.get('anime_id')
    if not anime_id:
        return Response({'message': 'anime_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_anime = UserAnime.objects.get(user=user, anime__id=anime_id)
        user_anime.delete()
        return Response({'message': 'Anime removed from the user\'s list'}, status=status.HTTP_200_OK)
    except UserAnime.DoesNotExist:
        return Response({'message': 'Anime not found in the user\'s list'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    """
    Returns the user's profile data.
    """
    user = request.user.userprofile
    return Response({'username': user.user.username, 'first_name': user.user.first_name, 'last_name': user.user.last_name, 'email': user.user.email}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recommendations(request):
    """
    Returns a list of anime titles recommended for the user.
    """
    user = request.user.userprofile
    user_anime_list = UserAnime.objects.filter(user=user)
    user_bookmarks = UserBookmarks.objects.filter(user=user)
    ranked_titles, bookmark_titles, user_ids = set(), set(), set()
    for item in user_anime_list:
        ranked_titles.add(item.anime.title)
        user_ids.add(item.anime.id)
    for bookmark in user_bookmarks:
        bookmark_titles.add(bookmark.anime.title)
        user_ids.add(bookmark.anime.id)
    recommendations = get_recommendations_as_list(
        ranked_titles, bookmark_titles)
    data = []
    recs_count = 0
    for rec in recommendations:
        response_data = fetch_anime_titles(rec)
        if response_data:
            item = response_data[0]
        else:
            print(f"couldn't find tv show for: {rec}")
            continue
        # don't recommend shows already in the user's ranked/bookmarked lists
        if item.get('id') in user_ids:
            continue
        if item.get('title').get('english') is not None:
            data.append({
                'id': item.get('id'),
                'title': item.get('title').get('english'),
                'start_date': item.get('startDate').get('year'),
                'end_date': item.get('endDate').get('year'),
                'episodes': item.get('episodes')})
            recs_count += 1
            if recs_count == 9:
                break
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bookmarks(request):
    """
    Returns a list of anime titles bookmarked by the user.
    """
    user = request.user.userprofile
    user_bookmarks = UserBookmarks.objects.filter(user=user)
    data = []
    for item in user_bookmarks:
        start_date = item.anime.start_date.strftime(
            '%Y') if item.anime.start_date else None
        end_date = item.anime.end_date.strftime(
            '%Y') if item.anime.end_date else None
        data.append(
            {'id': item.anime.id, 'title': item.anime.title, 'start_date': start_date, 'end_date': end_date, 'episodes': item.anime.episodes})
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_bookmark(request):
    """
    Adds an anime to the user's list.
    """
    user = request.user.userprofile
    anime_id = request.data.get('anime_id')
    if not anime_id:
        return Response({'message': 'anime_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the anime is not already in the user's list
    if UserBookmarks.objects.filter(user=user, anime__id=anime_id).exists():
        return Response({'message': 'Anime is already bookmarked'}, status=status.HTTP_400_BAD_REQUEST)
    anime_obj = fetch_anime_obj(anime_id)

    # Create a new entry in the UserAnime
    user_bookmark = UserBookmarks(user=user, anime=anime_obj)
    user_bookmark.save()

    if UserAnime.objects.filter(user=user, anime__id=anime_id).exists():
        user_anime = UserAnime.objects.get(user=user, anime__id=anime_id)
        user_anime.delete()

    return Response({'message': 'Anime bookmarked'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_bookmark(request):
    """
    Removes an anime from the user's list.
    """
    user = request.user.userprofile

    anime_id = request.data.get('anime_id')
    if not anime_id:
        return Response({'message': 'anime_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_bookmark = UserBookmarks.objects.get(
            user=user, anime__id=anime_id)
        user_bookmark.delete()
        return Response({'message': 'Anime removed from bookmarks'}, status=status.HTTP_200_OK)
    except UserBookmarks.DoesNotExist:
        return Response({'message': 'Anime not found in bookmarks'}, status=status.HTTP_404_NOT_FOUND)
