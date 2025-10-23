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
    const clienteRes = await fetch("/api/clientes", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(cliente)
    });
    const novoCliente = await clienteRes.json();
    await fetch("/api/pedidos", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        clienteId:novoCliente.id,
        itens:carrinho.map(c=>({produtoId:c.id, quantidade:1}))
      })
    });
    setMensagem("Pedido enviado com sucesso!");
    setCarrinho([]);
    setCliente({ nome:"", email:"", telefone:"" });
  }

  return (
    <div className="min-h-screen p-6">
      <h1>💳 Checkout</h1>
      {mensagem ? <p>{mensagem}</p> : (
        <form onSubmit={enviarPedido}>
          <input placeholder="Nome" value={cliente.nome} onChange={e=>setCliente({...cliente,nome:e.target.value})} required/>
          <input placeholder="Email" value={cliente.email} onChange={e=>setCliente({...cliente,email:e.target.value})} required/>
          <input placeholder="Telefone" value={cliente.telefone} onChange={e=>setCliente({...cliente,telefone:e.target.value})}/>
          <button type="submit">Enviar Pedido</button>
        </form>
      )}
    </div>
  );
}
