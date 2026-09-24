"use client";

import { useState } from "react";

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
        `https://ai-catalogo.onrender.com/pergunta?q=${encodeURIComponent(
          pergunta
        )}`
      );

      const dados = await res.json();

      setResposta(
        typeof dados.resultado === "string"
          ? dados.resultado
          : JSON.stringify(dados.resultado, null, 2)
      );
    } catch (error) {
      setResposta("Erro ao ligar à API.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Catálogo IA
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            placeholder="Faça uma pergunta..."
            className="flex-1 border border-gray-300 rounded-lg p-3"
          />

          <button
            onClick={pesquisar}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "A pesquisar..." : "Perguntar"}
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">
            Resposta
          </h2>

          <div className="border rounded-lg p-4 min-h-[200px] bg-gray-50 whitespace-pre-wrap">
            {resposta || "Nenhuma resposta ainda."}
          </div>
        </div>
      </div>
    </main>
  );
}
