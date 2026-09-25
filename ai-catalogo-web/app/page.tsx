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
        dados.resposta || "Nenhuma resposta encontrada."
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
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-5xl font-bold text-center mb-10">
          Catálogo IA
        </h1>

        <div className="flex gap-4">
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
            className="flex-1 border border-gray-300 rounded-lg p-4 text-lg"
          />

          <button
            onClick={pesquisar}
            disabled={loading}
            className="bg-blue-600 text-white px-8 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "A pesquisar..." : "Perguntar"}
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-semibold mb-4">
            Resposta
          </h2>

          <div className="border rounded-lg p-6 min-h-[250px] bg-gray-50 whitespace-pre-wrap">
            {resposta || "Faça uma pergunta sobre o catálogo."}
          </div>
        </div>

      </div>
    </main>
  );
}
