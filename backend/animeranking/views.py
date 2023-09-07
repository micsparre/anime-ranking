# appname/views.py

from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from .api_integration import fetch_data_from_api
from .serializers import TitleSerializer

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


@api_view(['POST'])
def create_title(request):
    if request.method == 'POST':
        try:
            serializer = TitleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse({'message': 'Item created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=400)
