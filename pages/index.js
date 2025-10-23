export default function Home() {
  const produtos = [
    { id: 1, nome: "Vestido Floral", preco: "R$ 89,90", imagem: "/logo.png" },
    { id: 2, nome: "Camisa Vintage", preco: "R$ 59,90", imagem: "/logo.png" },
    { id: 3, nome: "Saia Jeans", preco: "R$ 49,90", imagem: "/logo.png" }
  ];

  return (
    <div>
      <header>
        <h1>Garimpo Chique 👗</h1>
        <p>Moda sustentável e cheia de estilo</p>
      </header>

      <main>
        {produtos.map((p) => (
          <div key={p.id} className="product">
            <img src={p.imagem} width="100" />
            <h3>{p.nome}</h3>
            <p>{p.preco}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

