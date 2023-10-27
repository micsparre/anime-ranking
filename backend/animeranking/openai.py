import openai
import json

response_format = """
Can you help me recommend anime tv shows to my best friend? For context, here is the information of the tv shows they have watched:

{details}

Based on the information above, respond with a list of 15 anime tv shows (not movies) not in the user's list of watched shows as a list in the format: ["example title 1", "example title 2", ...].

I don't want any responses above or below the list. 
Let me be clear, just respond with the list in the requested format - nothing else - no numbers, no bullet points, no explanation of the list. 
Don't respond with: "Sure, here's a list of 15 anime tv shows (not movies) for your best friend based on the shows they've already watched:" or anything else along those lines.
"""


def get_recommendations_as_list(details: str) -> list:
    """
    Returns a dictionary of anime recommendations as JSON.
    """
    content = response_format.format(details=details)
    print(f"openai query: {content}")
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": content}])
    try:
        response = completion.choices[0].message.content
        response = json.loads(response)
    except:
        response = []
    print(f"openai response: {response}")
    return response
