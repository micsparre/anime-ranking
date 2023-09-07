# appname/views.py

from rest_framework import generics
from .models import Anime, UserAnimeRanking, Title
from .serializers import AnimeSerializer, UserAnimeRankingSerializer, TitleSerializer

class AnimeListCreateView(generics.ListCreateAPIView):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer

class UserAnimeRankingListCreateView(generics.ListCreateAPIView):
    queryset = UserAnimeRanking.objects.all()
    serializer_class = UserAnimeRankingSerializer

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .api_integration import fetch_data_from_api

@api_view(['GET'])
def get_titles_from_anilist(request):
    print(f"request: {request}")
    
    # Get the 'title' query parameter from the request
    title_query = request.query_params.get('title', None)
    
    print(f"title_query: {title_query}")

    if title_query is not None:
        # Call the function to fetch data from the third-party API
        external_data = fetch_data_from_api(title_query)

        # Save the external data to your Title model
        for item in external_data:
            Title.objects.create(name=item.get('title').get('english'), media_id=item.get("id"))
            

        # Retrieve and serialize the data from your Title model
        queryset = Title.objects.all()
        serializer = TitleSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # If no 'title' parameter is provided, return all data from your Title model
        queryset = Title.objects.all()
        serializer = TitleSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
