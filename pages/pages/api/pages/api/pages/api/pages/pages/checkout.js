import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Checkout() {
  const router = useRouter();
  const [carrinho, setCarrinho] = useState([]);
  const [cliente, setCliente] = useState({ nome: "", email: "", telefone: "" });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (router.query.carrinho) {
      setCarrinho(JSON.parse(router.query.carrinho));
    }
  }, [router.query]);

  async function enviarPedido(e) {
    e.preventDefault();

    // Cadastra o cliente
    const clienteRes = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    const novoCliente = await clienteRes.json();

    // Envia o pedido
    await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clienteId: novoCliente.id,
        itens: carrinho.map((c) => ({ produtoId: c.id, quantidade: 1 })),
      }),
    });

    setMensagem("Pedido enviado com sucesso! 💖");
    setCarrinho([]);
    setCliente({ nome: "", email: "", telefone: "" });
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">💳 Checkout</h1>

      {mensagem ? (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
          {mensagem}
        </div>
      ) : (
        <form onSubmit={enviarPedido} className="max-w-lg mx-auto bg-white shadow p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">🧍 Dados do Cliente</h2>
          <input
            className="w-full border p-2 mb-3 rounded-lg"
            placeholder="Nome"
            value={cliente.nome}
            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
            required
          />
          <input
            className="w-full border p-2 mb-3 rounded-lg"
            placeholder="E-mail"
            value={cliente.email}
            onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
            required
          />
          <input
            className="w-full border p-2 mb-4 rounded-lg"
            placeholder="Telefone"
            value={cliente.telefone}
            onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
          />

          <h2 className="text-xl font-semibold mb-4">🛒 Itens do Pedido</h2>
          <ul className="mb-4 divide-y">
            {carrinho.map((item, i) => (
              <li key={i} className="py-2 flex justify-between">
                <span>{item.nome}</span>
                <span>R$ {item.preco.toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold"
          >
            Enviar Pedido
          </button>
        </form>
      )}
    </div>
  );
}
