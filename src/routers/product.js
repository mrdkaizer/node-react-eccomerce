const express = require("express");

const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");
const { adminAuth } = require("../middleware/auth");

router.get("/product/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/product/:link", async (req, res) => {
  try {
    const product = await Product.findOne({ link: req.params.link });

    if (!product) {
      res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/product/:link", adminAuth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ link: req.params.link });
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/product/category/:category", async (req, res) => {
  try {
    const category = await Category.findOne({ link: req.params.category });
    if (!category) {
      res.send(404).send();
    }
    const products = await Product.find({
      "categories.category": category._id,
    });

    res.send(products);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/product/", adminAuth, async (req, res) => {
  try {
    let pricePreDiscount;
    let {
      name,
      available,
      price,
      discount,
      description,
      categories,
      images,
    } = req.body;

    if (discount) {
      pricePreDiscount = price;
      price = price * (1 - discount / 100);
    }

    for (let i = 0; i < categories.length; i++) {
      element = categories[i];
      const c = await Category.findOne({ link: element.category });
      element.category = c._id;
    }

    const p = new Product({
      name,
      available,
      price,
      discount,
      pricePreDiscount,
      description,
      categories,
      images,
    });

    await p.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
