import { useEffect, useState } from "react";
import Link from "next/link";

export default function Loja() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    fetch("/api/produtos")
      .then(res => res.json())
      .then(setProdutos)
      .catch(() => setProdutos([]));
  }, []);

  function adicionarAoCarrinho(produto) {
    setCarrinho([...carrinho, produto]);
  }

  function removerDoCarrinho(index) {
    setCarrinho(carrinho.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Garimpo Chique - Loja</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {produtos.map((p) => (
          <div key={p.id} className="bg-white shadow rounded-2xl p-4 flex flex-col">
            <img
              src={p.imagem}
              alt={p.nome}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold">{p.nome}</h2>
            <p className="text-sm text-gray-600 mb-2">{p.descricao}</p>
            <span className="font-bold text-pink-600 mb-4">
              R$ {p.preco.toFixed(2)}
            </span>
            <button
              onClick={() => adicionarAoCarrinho(p)}
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>

      {/* Carrinho */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">🛒 Carrinho</h2>
        {carrinho.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio</p>
        ) : (
          <>
            <ul className="divide-y">
              {carrinho.map((item, i) => (
                <li key={i} className="py-2 flex justify-between items-center">
                  <span>{item.nome}</span>
                  <button
                    onClick={() => removerDoCarrinho(i)}
                    className="text-red-500"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between items-center">
              <strong>
                Total: R${" "}
                {carrinho
                  .reduce((acc, item) => acc + item.preco, 0)
                  .toFixed(2)}
              </strong>
              <Link
                href={{
                  pathname: "/checkout",
                  query: { carrinho: JSON.stringify(carrinho) },
                }}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
              >
                Finalizar Pedido
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
