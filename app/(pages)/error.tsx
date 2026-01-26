"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 🔥 Erro vindo do SERVER, logado no CLIENT
    console.error("Erro capturado no client:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1>😵 Algo deu errado</h1>
      <p>Ocorreu um erro inesperado. Tente novamente.</p>

      <button
        onClick={reset}
        style={{
          marginTop: 16,
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        Tentar novamente
      </button>
    </div>
  );
}
