"use client";

import { useState } from "react";

export default function Home() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");

  async function pesquisar() {
    const res = await fetch(
      `https://ai-catalogo.onrender.com/pergunta?q=${encodeURIComponent(pergunta)}`
    );

    const dados = await res.json();

    setResposta(JSON.stringify(dados, null, 2));
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        Catálogo IA
      </h1>

      <input
        className="border p-2 w-full"
        value={pergunta}
        onChange={(e) => setPergunta(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 mt-4"
        onClick={pesquisar}
      >
        Perguntar
      </button>

      <pre className="mt-4">
        {resposta}
      </pre>
    </main>
  );
}