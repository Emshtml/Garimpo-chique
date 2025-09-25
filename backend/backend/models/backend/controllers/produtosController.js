const { readData, writeData } = require('../utils/fileHandler');
const DB_PATH = './backend/database/produtos.json';

exports.listar = async (req, res, next) => {
  try {
    const produtos = await readData(DB_PATH);
    res.json(produtos);
  } catch (err) {
    next(err);
  }
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
};

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
