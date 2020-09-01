const express = require("express");
//const bcrypt = require('bcryptjs')
const router = express.Router();
const { auth } = require("../middleware/auth");
const Customer = require("../models/customer");
const User = require("../models/user");

router.post("/customer/register", async (req, res) => {
  try {
    const { name, password, email, address, postal, city, country } = req.body;
    const u = new User({ name, password, email });
    if (!u) {
      res.status(400).send();
    }
    const c = new Customer({ user: u._id, address, postal, city, country });

    // create user and customer object
    await u.save();
    c.save(async (error) => {
      if (error) {
        await User.findOneAndDelete({ _id: u._id });
        res.status(400).send();
      }
      const token = await u.generateAuthToken();

      res.status(201).send({ token });
    });
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/customer", auth, async (req, res) => {
  try {
    const c = await Customer.findOne({ user: req.user._id });
    const { city, country, address, postal } = c;
    res.send({ address, postal, city, country });
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/customer", auth, async (req, res) => {
  try {
    const c = await Customer.findOne({ user: req.user._id });
    const { address, postal, city, country } = req.body;
    c.address = address;
    c.postal = postal;
    c.city = city;
    c.country = country;
    await c.save();

    res.send({ address, postal, city, country });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
