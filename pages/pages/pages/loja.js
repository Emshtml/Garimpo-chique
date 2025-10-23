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
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Loja</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {produtos.map(p => (
          <div key={p.id} className="border p-4 rounded-xl">
            <h2>{p.nome}</h2>
            <p>{p.descricao}</p>
            <p>R$ {p.preco}</p>
            <button onClick={() => adicionarAoCarrinho(p)}>Adicionar</button>
          </div>
        ))}
      </div>

      <div className="border p-4 rounded-xl">
        <h2>Carrinho</h2>
        {carrinho.length === 0 ? "Vazio" : (
          <>
            {carrinho.map((item,i)=>(
              <div key={i}>{item.nome} <button onClick={()=>removerDoCarrinho(i)}>Remover</button></div>
            ))}
            <Link href={{pathname:"/checkout", query:{carrinho:JSON.stringify(carrinho)}}}>
              Finalizar Pedido
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
