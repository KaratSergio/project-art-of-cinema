const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// Data
const Shop = require("./models/shop");
const Product = require("./models/product");
const Order = require("./models/order");

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/api/shops", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
