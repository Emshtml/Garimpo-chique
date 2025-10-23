// pages/api/pedidos.js

// Simulações em memória
let pedidos = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Lista todos os pedidos
    res.status(200).json(pedidos);
  } else if (req.method === "POST") {
    // Cria um novo pedido
    const novo = req.body;
    if (!novo.clienteId || !novo.itens || novo.itens.length === 0) {
      return res.status(400).json({ error: "Campos obrigatórios: clienteId e itens" });
    }
    novo.id = pedidos.length + 1;
    novo.data = new Date().toISOString();
    novo.status = "Em processamento";
    pedidos.push(novo);
    res.status(201).json(novo);
  } else if (req.method === "PUT") {
    // Atualiza status do pedido
    const { id, status } = req.body;
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });
    pedido.status = status || pedido.status;
    res.status(200).json(pedido);
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
