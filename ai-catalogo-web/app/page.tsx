"use client";

import { useState } from "react";

const api =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ai-catalogo.onrender.com";

export default function Home() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  async function pesquisar() {
    if (!pergunta.trim()) return;

    setLoading(true);
    setResposta("");

    try {
      const res = await fetch(
        `${api}/chat?q=${encodeURIComponent(pergunta)}`
      );

      const dados = await res.json();

      setResposta(
        dados.resposta ||
          "Nenhuma resposta encontrada."
      );
    } catch (error) {
      console.error(error);

      setResposta(
        "Erro ao ligar à API."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-8 md:py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">

        <h1 className="text-4xl md:text-6xl font-bold text-center text-slate-900 mb-10">
          Catálogo IA
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                pesquisar();
              }
            }}
            placeholder="Ex.: Que relatório mostra consultas?"
            className="
              flex-1
              border
              border-slate-300
              rounded-xl
              p-4
              text-base
              md:text-lg
              font-medium
              text-slate-800
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              font-sans
            "
          />

          <button
            onClick={pesquisar}
            disabled={loading}
            className="
              bg-blue-600
              text-white
              font-semibold
              px-8
              py-4
              rounded-xl
              hover:bg-blue-700
              transition
              shadow-md
              disabled:bg-slate-400
            "
          >
            {loading ? "A pesquisar..." : "Perguntar"}
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Resposta
          </h2>

          <div
            className="
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              p-6
              md:p-8
              min-h-[250px]
            "
          >
            <div
              className="
                whitespace-pre-wrap
                break-words
                text-slate-800
                text-base
                md:text-lg
                leading-9
                font-normal
              "
            >
              {resposta ||
                "Faça uma pergunta sobre o catálogo de dados."}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}