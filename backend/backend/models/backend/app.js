require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const produtosRoutes = require('./routes/produtos');
const usuariosRoutes = require('./routes/usuarios');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/api/produtos', produtosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ status: 'API Garimpo Chique rodando 🚀' });
});

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento global de erros
app.use((err, req, res, next) => {
  console.error(' Erro:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
