import { useState, useEffect } from "react";

export default function Admin() {
  const [autenticado,setAutenticado] = useState(false);
  const [usuario,setUsuario] = useState("");
  const [senha,setSenha] = useState("");
  const [pedidos,setPedidos] = useState([]);
  const [clientes,setClientes] = useState([]);
  const [erro,setErro] = useState("");

  async function login(e){
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({usuario,senha})
    });
    const data = await res.json();
    if(data.sucesso){
      setAutenticado(true);
      localStorage.setItem("adminToken","acesso-liberado");
      carregarDados();
    } else setErro("Usuário ou senha incorretos");
  }

  async function carregarDados(){
    const [cRes,pRes] = await Promise.all([fetch("/api/clientes"),fetch("/api/pedidos")]);
    setClientes(await cRes.json());
    setPedidos(await pRes.json());
  }

  useEffect(()=>{
    if(localStorage.getItem("adminToken")==="acesso-liberado"){setAutenticado(true); carregarDados();}
  },[]);

  if(!autenticado) return (
    <form onSubmit={login}>
      <input placeholder="Usuário" value={usuario} onChange={e=>setUsuario(e.target.value)}/>
      <input placeholder="Senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)}/>
      <button type="submit">Entrar</button>
      {erro && <p>{erro}</p>}
    </form>
  );

  return (
    <div>
      <h1>Painel Admin</h1>
      <h2>Clientes</h2>
      {clientes.map(c=><div key={c.id}>{c.nome} - {c.email}</div>)}
      <h2>Pedidos</h2>
      {pedidos.map(p=><div key={p.id}>Pedido #{p.id} Cliente:{p.clienteId}</div>)}
    </div>
  );
}
