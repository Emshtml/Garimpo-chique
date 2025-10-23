// pages/api/clientes.js

let clientes = [
  { id: 1, nome: "Maria Souza", email: "maria@email.com", telefone: "11999999999" },
  { id: 2, nome: "João Oliveira", email: "joao@email.com", telefone: "11988888888" }
];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Lista de clientes
    res.status(200).json(clientes);
  } else if (req.method === "POST") {
    // Adiciona novo cliente
    const novo = req.body;
    if (!novo.nome || !novo.email) {
      return res.status(400).json({ error: "Campos obrigatórios: nome e email" });
    }
    novo.id = clientes.length + 1;
    clientes.push(novo);
    res.status(201).json(novo);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
