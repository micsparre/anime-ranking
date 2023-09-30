# animeranking/views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .api_integration import fetch_anime_titles, fetch_anime_obj
from rest_framework.permissions import IsAuthenticated
from .models import UserAnimeList, UserProfile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token

# from .serializers import UserAnimeListSerializer
# from .serializers import UserSerializer


@api_view(['GET'])
def get_titles_from_anilist(request):
    """
    Returns a list of anime titles from the third-party API.
    """
    # breakpoint()
    # Get the 'title' query parameter from the request
    title_query = request.query_params.get('title', None)
    filtered_data = []
    if title_query is not None:
        # Call the function to fetch data from the third-party API
        external_data = fetch_anime_titles(title_query)
        for item in external_data:
            if item.get('title').get('english') is not None:
                filtered_data.append(
                    {'id': item.get('id'), 'title': item.get('title').get('english')})
    return Response(filtered_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_anime_list(request):
    """
    Returns a list of anime titles from the user's list.
    """
    # breakpoint()
    user = request.user.userprofile
    user_anime_list = UserAnimeList.objects.filter(user=user)
    user_anime_list_data = []
    for item in user_anime_list:
        user_anime_list_data.append(
            {'id': item.anime.id, 'title': item.anime.title, 'ranking': item.ranking})
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
        return Response({'detail': 'anime_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the anime is not already in the user's list
    if UserAnimeList.objects.filter(user=user, anime__id=anime_id).exists():
        return Response({'detail': 'Anime is already in the user\'s list'}, status=status.HTTP_400_BAD_REQUEST)
    breakpoint()
    anime_obj = fetch_anime_obj(anime_id)

    ranking = 10  # Set the default ranking to 10 TODO: get from client

    # Create a new entry in the UserAnimeList
    user_anime = UserAnimeList(user=user, anime=anime_obj, ranking=ranking)
    user_anime.save()

    return Response({'detail': 'Anime added to the user\'s list'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rank_anime(request):
    """
    Updates the ranking of an anime title in the user's list.
    """
    user = request.user.userprofile

    anime_id = request.data.get('anime_id')
    ranking = request.data.get('ranking')

    if not anime_id or not ranking:
        return Response({'detail': 'anime_id and ranking are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_anime = UserAnimeList.objects.get(user=user, anime__id=anime_id)
        user_anime.ranking = ranking
        user_anime.save()
        return Response({'detail': 'Anime ranking updated'}, status=status.HTTP_200_OK)
    except UserAnimeList.DoesNotExist:
        return Response({'detail': 'Anime not found in the user\'s list'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recommendations(request):
    """
    Returns a list of anime titles recommended for the user.
    """
    user = request.user.userprofile

    recommended_anime_titles = []
    # Implement your recommendation logic here, e.g., collaborative filtering or content-based filtering.
    # Generate a list of recommended anime titles based on the user's preferences.
    # recommended_anime_titles = your_recommendation_algorithm(user)

    return Response({'recommendations': recommended_anime_titles}, status=status.HTTP_200_OK)


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
        return Response({'detail': 'First name, last name, username, password, and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new user
    try:
        user = User.objects.create_user(
            first_name=first_name, last_name=last_name, username=username, password=password, email=email)
        user.save()

        # Optionally, create a UserProfile entry for additional user-related data
        user_profile = UserProfile(user=user)
        user_profile.save()

        return Response({'detail': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
