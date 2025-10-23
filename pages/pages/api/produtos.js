export default function handler(req, res) {
  const produtos = [
    { id: 1, nome: "Vestido Floral", preco: "R$ 89,90" },
    { id: 2, nome: "Camisa Vintage", preco: "R$ 59,90" },
    { id: 3, nome: "Saia Jeans", preco: "R$ 49,90" }
  ];
  res.status(200).json(produtos);
}
