import { useState, useEffect } from "react";

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState("");

  async function login(e) {
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });
    const data = await res.json();

    if (data.sucesso) {
      setAutenticado(true);
      localStorage.setItem("adminToken", data.token);
      carregarDados();
    } else {
      setErro("Usuário ou senha incorretos ❌");
    }
  }

  async function carregarDados() {
    const [clientesRes, pedidosRes] = await Promise.all([
      fetch("/api/clientes"),
      fetch("/api/pedidos"),
    ]);

    const clientesData = await clientesRes.json();
    const pedidosData = await pedidosRes.json();

    setClientes(clientesData);
    setPedidos(pedidosData);
  }

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token === "acesso-liberado") {
      setAutenticado(true);
      carregarDados();
    }
  }, []);

  if (!autenticado) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-50">
        <h1 className="text-3xl font-bold mb-6">🔐 Acesso Administrativo</h1>
        <form onSubmit={login} className="bg-white p-6 rounded-2xl shadow-md w-80">
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border p-2 mb-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border p-2 mb-3 rounded-lg"
          />
          {erro && <p className="text-red-500 text-sm mb-3">{erro}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🧾 Painel Administrativo</h1>
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            setAutenticado(false);
          }}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Sair
        </button>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">👥 Clientes</h2>
          <ul className="divide-y">
            {clientes.map((c, i) => (
              <li key={i} className="py-2">
                <strong>{c.nome}</strong> <br />
                <small>{c.email}</small>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">📦 Pedidos</h2>
          <ul className="divide-y">
            {pedidos.map((p, i) => (
              <li key={i} className="py-2">
                <strong>Pedido #{p.id}</strong>
                <br />
                Cliente ID: {p.clienteId}
                <br />
                Itens: {p.itens?.length || 0}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
