from database import engine
from sqlalchemy import text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    
@app.get("/pergunta")
def pergunta(q: str):

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

    return {
        "pergunta": q,
        "resultado": dados
    }

@app.get("/teste-db")
def teste_db():

    with engine.connect() as conn:
        resultado = conn.execute(text("SELECT 1"))

    return {
        "status": "ok"
    }