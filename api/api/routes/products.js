const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Rota GET todos produtos
router.get("/", (req, res) => {
  res.json(Product.getAll());
});

// Rota POST criar produto
router.post("/", (req, res) => {
  const product = Product.create(req.body);
  res.status(201).json(product);
});

module.exports = router;
