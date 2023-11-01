# api_integration.py

import requests
from .models import Anime, Genre
from datetime import date

BASE_API_URL = 'https://graphql.anilist.co'

# fetch english titles from AniList GraphQL API


def fetch_data_from_api(arg, query):
    """
    Returns a list of objects from the third-party API.
    """

    variables = {
        'query': arg
    }

    try:
        response = requests.post(
            BASE_API_URL, json={'query': query, 'variables': variables}, verify=True)
        response.raise_for_status()  # Check for HTTP errors
        raw_data = response.json()  # Parse JSON response
        data = raw_data['data']['AnimeSearch']['media']
        return data
    except requests.exceptions.RequestException as e:
        # Handle request errors or exceptions
        print(f"Error: {e}")
        return None


def fetch_anime_obj(id):
    """
    Returns an anime object from the third-party API given an id.
    """
    query = '''
        query ($query: Int) {
            AnimeSearch: Page {
                media(id: $query, type: ANIME) {
                    id
                    title {
                        english
                    }
                    genres
                    episodes
                    averageScore
                    popularity
                    startDate {
                        year
                        month
                        day
                    }
                    endDate {
                        year
                        month
                        day
                    }
                }
            }
        }
    '''
    anime_data = fetch_data_from_api(id, query)[0]
    anime_obj = build_anime(anime_data)
    return anime_obj


def fetch_anime_titles(title):
    """
    Returns a list of anime titles from the third-party API.
    """
    query = '''
        query ($query: String) {
            AnimeSearch: Page {
                media(search: $query, type: ANIME) {
                    id
                    title {
                        english
                    }
                    episodes
                    startDate {
                        year
                    }
                    endDate {
                        year
                    }
                }
            }
        }
    '''
    return fetch_data_from_api(title, query)


def build_anime(data):
    """
    Builds an Anime model object from API data.
    """
    # Extract data fields
    id = data['id']
    title = data['title']['english']
    genres = data['genres']
    episodes = data['episodes']
    average_score = data['averageScore']
    popularity = data['popularity']
    if data['startDate']['year'] is None or data['startDate']['month'] is None or data['startDate']['day'] is None:
        start_date = None
    else:
        start_date = date(data['startDate']['year'],
                          data['startDate']['month'], data['startDate']['day'])
    if data['endDate']['year'] is None or data['endDate']['month'] is None or data['endDate']['day'] is None:
        end_date = None
    else:
        end_date = date(data['endDate']['year'], data['endDate']
                        ['month'], data['endDate']['day'])
    anime_obj = Anime(id=id, title=title, average_score=average_score,
                      popularity=popularity, episodes=episodes, start_date=start_date, end_date=end_date)
    anime_obj.save()
    for genre in genres:
        genre_obj = Genre.objects.get_or_create(name=genre)[0]
        anime_obj.genre.add(genre_obj)
    anime_obj.save()
    return anime_obj
