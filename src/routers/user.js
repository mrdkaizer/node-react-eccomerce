const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const User = require("../models/user");
const randStr = require("randomstring");
const sendEmail = require("../utils/sendEmail");

router.get("/user", auth, async (req, res) => {
  try {
    const { name, email } = req.user;
    res.send({ name, email });
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/user/reset", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send();
    }
    const preHashed = randStr.generate(8);
    user.password = preHashed;
    await user.save();

    sendEmail(
      email,
      "Password Reset",
      `Hey,\nYour new password is: ${preHashed} \nBest Regards`,
      `Hey,<br>Your new password is:<strong> ${preHashed}</strong><br>Best Regards`
    );
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const u = await User.findByCredentials(req.body.email, req.body.password);
    const token = await u.generateAuthToken();
    res.send({ id: u._id, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    const u = await User.findByCredentials(req.body.email, req.body.password);
    if (u.isAdmin !== "%69)0LLkK") {
      return res.status(400).send();
    }
    const token = await u.generateAuthToken();
    res.send({ id: u._id, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.loginTokens = req.user.loginTokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.loginTokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/user/", async (req, res) => {
  const { name, email, password } = req.body;
  const u = new User({ name, email, password });
  try {
    await u.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/user", auth, async (req, res) => {
  try {
    const user = req.user;
    const { password } = req.body;
    user.password = password;
    await user.save();

    res.send();
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
