backend/
├─ app.js
├─ routes/
│  ├─ produtos.js
│  └─ usuarios.js
├─ controllers/
│  ├─ produtosController.js
│  └─ usuariosController.js
├─ database/
│  ├─ produtos.json
│  └─ usuarios.json
├─ utils/
│  └─ fileHandler.js
├─ .env.example
├─ package.json
└─ README.md
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
});const { readData, writeData } = require('../utils/fileHandler');
const DB_PATH = './backend/database/produtos.json';

exports.listar = async (req, res, next) => {
  try {
    const produtos = await readData(DB_PATH);
    res.json(produtos);
  } catch (err) {
    next(err);
  }
};const fs = require('fs').promises;

exports.readData = async (file) => {
  try {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

exports.writeData = async (file, data) => {
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
};


exports.buscarPorId = async (req, res, next) => {
  try {
    const produtos = await readData(DB_PATH);
    const produto = produtos.find(p => p.id == req.params.id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    next(err);
  }
};

exports.criar = async (req, res, next) => {
  try {
    const produtos = await readData(DB_PATH);
    const novo = { id: Date.now(), ...req.body };
    produtos.push(novo);
    await writeData(DB_PATH, produtos);
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const produtos = await readData(DB_PATH);
    const index = produtos.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Produto não encontrado' });

    produtos[index] = { ...produtos[index], ...req.body };
    await writeData(DB_PATH, produtos);
    res.json(produtos[index]);
  } catch (err) {
    next(err);
  }
};PORT=3000


exports.deletar = async (req, res, next) => {
  try {
    let produtos = await readData(DB_PATH);
    produtos = produtos.filter(p => p.id != req.params.id);
    await writeData(DB_PATH, produtos);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.get('/', produtosController.listar);
router.get('/:id', produtosController.buscarPorId);
router.post('/', produtosController.criar);
router.put('/:id', produtosController.atualizar);
router.delete('/:id', produtosController.deletar);

module.exports = router;

[]{
  "name": "garimpo-chique-backend",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
cd backend
npm install
cp .env.example .env
npm run dev


// Tratamento global de erros
app.use((err, req, res, next) => {
  console.error(' Erro:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));

