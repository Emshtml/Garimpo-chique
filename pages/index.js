// pages/index.js
import '../style.css';

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1>🛍️ Garimpo Chique</h1>
        <p className="subtitle">Achadinhos com estilo e propósito</p>
      </header>

      <section className="about">
        <h2>Sobre</h2>
        <p>
          O Garimpo Chique é um espaço de moda sustentável, onde cada peça tem história.
          Explore, descubra e renove seu estilo com consciência. 🌿
        </p>
      </section>

      <section className="catalog">
        <h2>Catálogo</h2>
        <div className="grid">
          <div className="card">👗 Vestidos</div>
          <div className="card">👖 Calças</div>
          <div className="card">👜 Bolsas</div>
          <div className="card">👠 Sapatos</div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Garimpo Chique — Brechó online</p>
      </footer>
    </main>
  );
}
