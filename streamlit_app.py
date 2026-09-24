import streamlit as st
import requests

st.title("Catálogo de Dados IA")

pergunta = st.text_input("Faça uma pergunta")

if st.button("Enviar"):

    resposta = requests.get(
        "http://localhost:8000/pergunta",
        params={"q": pergunta}
    )

    if resposta.status_code == 200:
        st.write(resposta.json()["resposta"])
    else:
        st.error("Erro ao consultar a API")
