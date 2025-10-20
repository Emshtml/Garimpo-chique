import { useState } from "react";
import "../styles/Home.css"; // Import do CSS separado

export default function Home() {
  const [cart, setCart] = useState([]);
  const [orderComplete, setOrderComplete] = useState(false);

  const products = [
    { id: 1, name: "Vestido Floral", price: 89.9, image: "/images/vestido1.jpg" },
    { id: 2, name: "Bolsa de Couro", price: 129.9, image: "/images/bolsa1.jpg" },
    { id: 3, name: "Sapato Bege", price: 149.9, image: "/images/sapato1.jpg" },
  ];

  const addToCart = (p) => setCart([...cart, p]);
  const removeFromCart = (i) => setCart(cart.filter((_, index) => index !== i));
  const finalizePurchase = () => {
    setOrderComplete(true);
    setCart([]);
    setTimeout(() => setOrderComplete(false), 4000);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <header>
        <h1>👗 Garimpo Chique</h1>
        <p>Moda sustentável, exclusiva e cheia de estilo.</p>
      </header>

      <section className="products">
        <h2>✨ Produtos</h2>
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">R$ {p.price.toFixed(2)}</p>
              <button className="btn-add" onClick={() => addToCart(p)}>
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <h2>🛒 Carrinho</h2>
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            {cart.map((item, i) => (
              <div key={i} className="cart-item">
                <span>{item.name}</span>
                <span>R$ {item.price.toFixed(2)}</span>
                <button className="btn-remove" onClick={() => removeFromCart(i)}>
                  Remover
                </button>
              </div>
            ))}
            <h3>Total: R$ {total.toFixed(2)}</h3>
            <button className="btn-finalize" onClick={finalizePurchase}>
              Finalizar compra
            </button>
          </>
        )}
        {orderComplete && (
          <div className="order-complete">
            ✅ Pedido confirmado! Obrigado por comprar no Garimpo Chique 💖
          </div>
        )}
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Garimpo Chique – Moda com propósito 🌿</p>
      </footer>
    </div>
  );
}


