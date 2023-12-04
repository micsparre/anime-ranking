import openai
import json

response_format = """
Can you help me recommend anime tv shows to my best friend? For context, 

Here are the titles of the anime tv shows they have watched:

{ranked_titles}

Here are the titles of the anime tv shows they have bookmarked to watch later:

{bookmark_titles}

Based on the information above, respond with a list of 15 anime tv shows not in the user's list of watched/bookmarked content as a list in the format: ["example title 1", "example title 2", ...].

I don't want any responses above or below the list. 
Let me be clear, just respond with the list in the requested format - nothing else - no numbers, no bullet points, no explanation of the list. 
Don't respond with: "Sure, here's a list of 15 anime tv shows for your best friend based on the content they've already watched/bookmarked:" or anything else along those lines.
"""


def get_recommendations_as_list(ranked_titles: list, bookmark_titles: list) -> list:
    """
    Returns a dictionary of anime recommendations as JSON.
    """
    content = response_format.format(ranked_titles=", ".join(
        ranked_titles), bookmark_titles=", ".join(bookmark_titles))
    print(f"openai query: {content}")
    completion = openai.ChatCompletion.create(
        model="gpt-4-1106-preview", messages=[{"role": "user", "content": content}])
    try:
        response = completion.choices[0].message.content
        response = json.loads(response)
    except:
        response = []
    print(f"openai response: {response}")
    return response
