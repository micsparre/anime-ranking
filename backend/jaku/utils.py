from Levenshtein import distance as levenshtein_distance


def similarity_score(item, comparison):
    """
    Returns a score representing the similarity of the item's title to the
    comparison string. The higher the score, the more similar the strings.
    """
    s = item["title"].lower()
    if s == comparison:
        return -float("inf")  # Represents infinity

    # If the comparison string is a substring of the title, return a negative weight relative to the length of the title
    if comparison in s:
        return -(len(comparison) / len(s))

    # Calculate the Levenshtein distance between the strings
    distance = levenshtein_distance(s, comparison)

    # Return the negative distance as the similarity score
    return distance


def sort_titles(anime, comparison):
    """
    Sorts a list of titles by similarity to a comparison string.
    """

    # Sort the list alphabetically in case of tied scores in next pass
    first_pass = sorted(anime, key=lambda x: x["title"])

    # Sort the list by similarity to the comparison string
    return sorted(first_pass, key=lambda x: similarity_score(x, comparison))
