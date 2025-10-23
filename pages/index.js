export default function Home() {
  const produtos = [
    { id: 1, nome: "Vestido Floral", preco: "R$ 89,90", imagem: "/logo.png" },
    { id: 2, nome: "Camisa Vintage", preco: "R$ 59,90", imagem: "/logo.png" },
    { id: 3, nome: "Saia Jeans", preco: "R$ 49,90", imagem: "/logo.png" }
  ];

  return (
    <div>
      <header style={{ textAlign: "center", padding: "1rem", background: "#222", color: "#fff" }}>
        <h1>Garimpo Chique 👗</h1>
        <p>Moda sustentável e cheia de estilo</p>
      </header>

      <main style={{ padding: "1rem" }}>
        {produtos.map((p) => (
          <div key={p.id} style={{ 
            background: "#fff", 
            borderRadius: "10px", 
            margin: "1rem 0", 
            padding: "1rem", 
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)" 
          }}>
            <img src={p.imagem} width="100" alt={p.nome} />
            <h3>{p.nome}</h3>
            <p>{p.preco}</p>
          </div>
        ))}
      </main>

      <footer style={{ textAlign: "center", padding: "1rem", background: "#eee" }}>
        © 2025 Garimpo Chique
      </footer>
    </div>
  );
}


