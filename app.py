from fastapi import FastAPI

app = FastAPI()

@app.get("/pergunta")
def pergunta(q: str):

    return {
        "pergunta": q,
        "resultado": f"Pesquisar catálogo por: {q}"
    }