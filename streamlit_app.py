import streamlit as st
import requests

st.title("Catálogo IA")

pergunta = st.text_input("Pergunta")

if pergunta:

    resposta = requests.get(
        "http://localhost:8000/pergunta",
        params={"q": pergunta}
    )

    dados = resposta.json()

    st.write("### Resultado")
    st.write(dados["resultado"])