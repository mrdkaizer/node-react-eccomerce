const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "L9%4e/rlz{L$llK4{");
    const user = await User.findOne({
      _id: decoded._id,
      "loginTokens.token": token,
    });
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "L9%4e/rlz{L$llK4{");
    const user = await User.findOne({
      _id: decoded._id,
      "loginTokens.token": token,
    });
    if (!user || user.isAdmin !== "%69)0LLkK") {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

module.exports = { auth, adminAuth };
