import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [orderComplete, setOrderComplete] = useState(false);

  const products = [
    {
      id: 1,
      name: "Vestido Floral",
      price: 89.9,
      image: "/images/vestido1.jpg",
    },
    {
      id: 2,
      name: "Bolsa de Couro",
      price: 129.9,
      image: "/images/bolsa1.jpg",
    },
    {
      id: 3,
      name: "Sapato Bege",
      price: 149.9,
      image: "/images/sapato1.jpg",
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const finalizePurchase = () => {
    setOrderComplete(true);
    setCart([]);
    setTimeout(() => setOrderComplete(false), 5000); // Mensagem desaparece após 5s
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", padding: "20px", textAlign: "center" }}>
      <h1>👗 Garimpo Chique</h1>
      <p>Moda sustentável, exclusiva e cheia de estilo.</p>

      <h2>✨ Produtos</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              width: "180px",
              padding: "10px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3>{p.name}</h3>
            <p>R$ {p.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(p)}
              style={{
                background: "#e91e63",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>🛒 Carrinho</h2>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {item.name} — R$ {item.price.toFixed(2)}
              <button
                onClick={() => removeFromCart(index)}
                style={{
                  background: "gray",
                  color: "white",
                  border: "none",
                  padding: "5px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remover
              </button>
            </div>
          ))}

          <h3>Total: R$ {total.toFixed(2)}</h3>
          <button
            onClick={finalizePurchase}
            style={{
              background: "#4caf50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Finalizar compra
          </button>
        </div>
      )}

      {orderComplete && (
        <div
          style={{
            background: "#dff0d8",
            color: "#3c763d",
            marginTop: "20px",
            padding: "10px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          ✅ Pedido confirmado! Obrigado por comprar no Garimpo Chique 💖
        </div>
      )}
    </div>
  );
}

