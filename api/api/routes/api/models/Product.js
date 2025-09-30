const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../database/db.json");

class Product {
  static getAll() {
    const data = JSON.parse(fs.readFileSync(dbPath));
    return data.products || [];
  }

  static create(obj) {
    const data = JSON.parse(fs.readFileSync(dbPath));
    const products = data.products || [];
    const newProduct = { id: Date.now(), ...obj };
    products.push(newProduct);
    data.products = products;
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return newProduct;
  }
}

module.exports = Product;
