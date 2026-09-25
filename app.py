from database import engine
from sqlalchemy import text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from gemini_service import perguntar_gemini

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/chat")
def chat(q: str):

    with engine.connect() as conn:

        resultado = conn.execute(
            text("""
                SELECT
                    codigo_relatorio,
                    nome_relatorio,
                    descricao,
                    modulo
                FROM catalogo_relatorios
                WHERE nome_relatorio ILIKE :q
                   OR descricao ILIKE :q
                   OR palavras_chave ILIKE :q
            """),
            {"q": f"%{q}%"}
        )

        dados = [
            dict(row._mapping)
            for row in resultado
        ]

    contexto = str(dados)

    prompt = f"""
    És um assistente de catálogo de dados.

    Contexto:
    {contexto}

    Pergunta:
    {q}

    Responde em português de forma clara.
    """

    try:

        resposta = perguntar_gemini(prompt)

        return {
            "pergunta": q,
            "resposta": resposta
        }

    except Exception as e:

        return {
            "pergunta": q,
            "resposta": "O modelo está temporariamente indisponível."
        }

@app.get("/relatorios")
def listar_relatorios():

    with engine.connect() as conn:

        resultado = conn.execute(
            text("""
                SELECT
                    id_relatorio,
                    codigo_relatorio,
                    nome_relatorio,
                    descricao
                FROM catalogo_relatorios
                ORDER BY nome_relatorio
            """)
        )

        return [
            dict(row._mapping)
            for row in resultado
        ]
    