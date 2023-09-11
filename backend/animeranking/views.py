# animeranking/views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .api_integration import fetch_data_from_api
from rest_framework.permissions import IsAuthenticated
from .models import UserAnimeList, UserProfile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token

# from .serializers import UserAnimeListSerializer
# from .serializers import UserSerializer


# Get the titles from the third-party API
@api_view(['GET'])
def get_titles_from_anilist(request):
    # Get the 'title' query parameter from the request
    title_query = request.query_params.get('title', None)
    filtered_data = []
    if title_query is not None:
        # Call the function to fetch data from the third-party API
        external_data = fetch_data_from_api(title_query)
        for item in external_data:
            if item.get('title').get('english') is not None:
                filtered_data.append(
                    {'id': item.get('id'), 'title': item.get('title').get('english')})
    return Response(filtered_data, status=status.HTTP_200_OK)

# allows a user to add anime to their list
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_anime_to_user_list(request):
    user = request.user.userprofile  # Assuming you have a UserProfile model associated with the user
    
    # Get the anime_id from the request data
    anime_id = request.data.get('anime_id')
    if not anime_id:
        return Response({'detail': 'anime_id is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if the anime is not already in the user's list
    if UserAnimeList.objects.filter(user=user, anime__id=anime_id).exists():
        return Response({'detail': 'Anime is already in the user\'s list'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Create a new entry in the UserAnimeList
    user_anime = UserAnimeList(user=user, anime_id=anime_id)
    user_anime.save()
    
    return Response({'detail': 'Anime added to the user\'s list'}, status=status.HTTP_201_CREATED)

#  lets a user update the ranking of an anime title in their list.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rank_anime(request):
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

# retrieves personalized anime recommendations for the user based on the recommendation algorithm
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recommendations(request):
    user = request.user.userprofile
    
    recommended_anime_titles = []
    # Implement your recommendation logic here, e.g., collaborative filtering or content-based filtering.
    # Generate a list of recommended anime titles based on the user's preferences.
    # recommended_anime_titles = your_recommendation_algorithm(user)
    
    return Response({'recommendations': recommended_anime_titles}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register_user(request):
    breakpoint()
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    # Validate input data
    if not username or not password or not email:
        return Response({'detail': 'Username, password, and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new user
    try:
        user = User.objects.create_user(username=username, password=password, email=email) # TODO: do we need both user saves?
        user.save()

        # Optionally, create a UserProfile entry for additional user-related data
        user_profile = UserProfile(user=user)
        user_profile.save()

        return Response({'detail': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
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
