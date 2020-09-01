const express = require("express");

const router = express.Router();
const Page = require("../models/page");
const { adminAuth } = require("../middleware/auth");

router.get("/page", async (req, res) => {
  try {
    const page = await Page.find();
    if (page.length === 0) {
      res.status(404).send();
    }
    res.send(page);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/page/:link", async (req, res) => {
  try {
    const page = await Page.findOne({ link: req.params.link });
    if (!page) {
      res.status(404).send();
    }
    res.send(page);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/page", adminAuth, async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/page/:link", adminAuth, async (req, res) => {
  try {
    const page = await Page.findOneAndDelete({ link: req.params.link });
    if (!page) {
      res.status(404).send();
    }
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/page/:link", adminAuth, async (req, res) => {
  try {
    const p = await Page.findOne({ link: req.params.link });
    if (!p) {
      return res.status(404).send();
    }
    if (req.body.title) {
      p.title = req.body.title;
    }
    if (req.body.content) {
      p.content = req.body.content;
    }

    p.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});
module.exports = router;
