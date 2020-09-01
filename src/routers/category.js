const express = require("express");

const router = express.Router();
const Category = require("../models/category");
const { adminAuth } = require("../middleware/auth");

router.get("/category", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/category/", adminAuth, async (req, res) => {
  const c = new Category(req.body);
  try {
    await c.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/category/:link", async (req, res) => {
  try {
    const c = await Category.findOne({ link: req.params.link });
    if (!c) {
      res.status(404).send();
    }
    res.send(c);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/category/:link", adminAuth, async (req, res) => {
  try {
    const c = await Category.findOneAndDelete({ link: req.params.link });
    if (!c) {
      res.status(404).send();
    }
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/category/:link", adminAuth, async (req, res) => {
  try {
    const c = await Category.findOne({ link: req.params.link });
    if (!c) {
      res.status(404).send();
    }
    if (req.body.name) {
      c.name = req.body.name;
    }
    if (req.body.about) {
      c.about = req.body.about;
    }
    c.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
