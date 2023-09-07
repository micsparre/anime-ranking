# api_integration.py

import requests
from django.conf import settings

# fetch english titles from AniList GraphQL API
def fetch_data_from_api(title):
    url = 'https://graphql.anilist.co' 
    
    query = '''
            query ($query: String) {
            AnimeSearch: Page {
                media(search: $query, type: ANIME, format: TV) {
                id
                title {
                    english
                }
            }
            }
            }
            '''
    
    variables = {
        'query': title
    }

    try:
        response = requests.post(url, json={'query': query, 'variables' : variables}, verify=False)
        response.raise_for_status()  # Check for HTTP errors
        raw_data = response.json()  # Parse JSON response
        data = raw_data['data']['AnimeSearch']['media']
        return data
    except requests.exceptions.RequestException as e:
        # Handle request errors or exceptions
        print(f"Error: {e}")
        return None
