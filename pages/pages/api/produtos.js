// pages/api/produtos.js

// Simulação de um pequeno banco de dados na memória
let produtos = [
  { id: 1, nome: "Vestido Floral", preco: 89.90, categoria: "Roupas", estoque: 5 },
  { id: 2, nome: "Bolsa de Palha", preco: 120.00, categoria: "Acessórios", estoque: 3 },
  { id: 3, nome: "Calça Jeans Reciclada", preco: 99.90, categoria: "Roupas", estoque: 8 }
];

// Função que lida com requisições HTTP
export default function handler(req, res) {
  if (req.method === "GET") {
    // Retorna a lista de produtos
    res.status(200).json(produtos);
  } else if (req.method === "POST") {
    // Adiciona novo produto
    const novo = req.body;
    if (!novo.nome || !novo.preco) {
      return res.status(400).json({ error: "Campos obrigatórios: nome, preco" });
    }
    novo.id = produtos.length + 1;
    produtos.push(novo);
    res.status(201).json(novo);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
