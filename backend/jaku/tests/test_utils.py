from unittest import TestCase
from jaku.utils import sort_titles
from .test_values import NARUTO_SEARCH_TITLES, SORTED_NARUTO_SEARCH_TITLES


class SortedAnimeTestCase(TestCase):
    """
    Tests the sorted_titles function given a comparison string.
    """

    def test_sorted_titles(self):
        self.assertEqual(sort_titles(NARUTO_SEARCH_TITLES,
                         "Naruto"), SORTED_NARUTO_SEARCH_TITLES)
