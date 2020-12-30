const express = require("express");

const router = express.Router();
const Info = require("../models/info");
const { adminAuth } = require("../middleware/auth");

router.get("/info", async (req, res) => {
  try {
    const info = await Info.findOne();
    if (!info) {
      res.status(404).send();
    }
    res.send(info);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/info", adminAuth, async (req, res) => {
  try {
    const temp = await Info.find();
    if (temp.length === 0) {
      const info = new Info(req.body);
      await info.save();
      res.status(201).send();
    }
    res.status(400).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/info/", adminAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const result = await Info.find();
    const info = result[0];
    if (!info) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      info[update] = req.body[update];
    });
    await info.save();
    res.send(info);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
