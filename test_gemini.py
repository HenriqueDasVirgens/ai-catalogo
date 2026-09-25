import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

try:

    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )

    print("Cliente criado")

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents="Olá"
    )

    print("Resposta recebida")
    print(response.text)

except Exception as e:
    print("ERRO:")
    print(e)