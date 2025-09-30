const express = require("express");
const app = express();
const productsRouter = require("./routes/products");

app.use(express.json());
app.use("/api/products", productsRouter);

// Exporta como função para Vercel
module.exports = app;

// Para rodar localmente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
