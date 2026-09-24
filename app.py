from fastapi import FastAPI
import requests

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/generate"

@app.get("/pergunta")
def pergunta(q: str):

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "phi3:mini",
            "prompt": q,
            "stream": False
        }
    )

    resultado = response.json()

    return {
        "pergunta": q,
        "resposta": resultado["response"]
    }