const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//connect to db
require("../db/mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("This is not a valid Email!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  loginTokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
  isAdmin: {
    type: String,
    required: false,
  },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    "L9%4e/rlz{L$llK4{"
  );
  user.loginTokens = user.loginTokens.concat({
    token,
  });
  await user.save();

  return token;
};

userSchema.statics.checkAuthorization = async function (token) {
  try {
    return jwt.verify(token, "L9%4e/rlz{L$llK4{");
  } catch (e) {
    throw new Error("Not Authorized");
  }
};

// find user by username and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

//Hash the plain text pasword before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
