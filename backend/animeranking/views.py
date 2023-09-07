# appname/views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .api_integration import fetch_data_from_api

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
                filtered_data.append({'id': item.get('id'), 'title': item.get('title').get('english')})
    return Response(filtered_data, status=status.HTTP_200_OK)
