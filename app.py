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

@app.get("/tabelas")
def listar_tabelas():

    with engine.connect() as conn:

        resultado = conn.execute(
            text("""
                SELECT nome_tabela,
                       descricao
                FROM catalogo_tabelas
                ORDER BY nome_tabela
            """)
        )

        return [
            dict(row._mapping)
            for row in resultado
        ]

@app.get("/tabela/{nome}")
def obter_tabela(nome: str):

    with engine.connect() as conn:

        resultado = conn.execute(
            text("""
                SELECT *
                FROM catalogo_tabelas
                WHERE nome_tabela = :nome
            """),
            {"nome": nome}
        ).fetchone()

    if not resultado:
        return {"erro": "Tabela não encontrada"}

    return dict(resultado._mapping)

@app.get("/pergunta")
def pergunta(q: str):

    with engine.connect() as conn:

        resultado = conn.execute(
            text("""
                SELECT nome_tabela,
                       descricao
                FROM catalogo_tabelas
                WHERE nome_tabela ILIKE :q
                   OR descricao ILIKE :q
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