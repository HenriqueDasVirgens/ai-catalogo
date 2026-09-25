import os
from google import genai

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def perguntar_gemini(pergunta: str):

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=pergunta
    )

    return response.text