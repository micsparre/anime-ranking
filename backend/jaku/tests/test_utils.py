from unittest import TestCase
from animeranking.utils import sort_anime
from .test_values import NARUTO_SEARCH_TITLES, SORTED_NARUTO_SEARCH_TITLES


class SortedAnimeTestCase(TestCase):
    """
    Tests the sorted_titles function given a comparison string.
    """

    def test_sorted_titles(self):
        self.assertEqual(sort_anime(NARUTO_SEARCH_TITLES,
                         "Naruto"), SORTED_NARUTO_SEARCH_TITLES)
