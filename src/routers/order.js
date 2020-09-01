const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const Order = require("../models/order");
const Customer = require("../models/customer");
const Product = require("../models/product");

router.post("/order/user", auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({ user: req.user._id });
    const c = req.body.cart;
    const total = req.body.total;
    const shipping = req.body.shipping;

    let cart = [];

    for (let i = 0; i < c.length; i++) {
      const { _id, price } = await Product.findOne({ link: c[i].link });
      cart = cart.concat({ product: _id, quantity: c[i].quantity, price });
    }

    const order = new Order({
      cart,
      customer: customer._id,
      total,
      shipping,
      status: 0,
    });
    await order.save();

    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/order", async (req, res) => {
  try {
    const {
      cart,
      total,
      shipping,
      name,
      email,
      address,
      postal,
      country,
    } = req.body;

    let cartArray = [];

    for (let i = 0; i < cart.length; i++) {
      const { _id, price } = await Product.findOne({ link: cart[i].link });
      cartArray = cartArray.concat({
        product: _id,
        quantity: cart[i].quantity,
        price,
      });
    }
    const order = new Order({
      cart: cartArray,
      total,
      shipping,
      name,
      address,
      email,
      postal,
      country,
      status: 0,
    });

    await order.save();

    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).send();
    }
    let cart = [];

    for (let i = 0; i < order.cart.length; i++) {
      const element = order.cart[i];
      const product = await Product.findById(element.product);
      cart = cart.concat({
        product: product.link,
        quantity: element.quantity,
        price: element.price,
      });
    }

    const { total, shipping, status } = order;
    res.send({ total, shipping, cart, status });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/order/", auth, async (req, res) => {
  try {
    const c = await Customer.findOne({ user: req.user._id });
    const orders = await Order.find({ customer: c._id });
    let retOrders = [];
    for (let i = orders.length - 1; i >= 0; i--) {
      const { _id, total, shipping } = orders[i];
      retOrders = retOrders.concat({
        id: _id,
        date: _id.getTimestamp(),
        total,
        shipping,
      });
    }
    res.send(retOrders);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
