const mongoose = require("mongoose");

//connect to db
require("../db/mongoose");

const infoSchema = new mongoose.Schema({
  sitename: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  announcement: {
    type: String,
    required: false,
  },
  shippingCharge: {
    type: Number,
    required: true,
  },
  shippingThreshold: {
    type: Number,
    required: true,
  },
  currencySymbol: {
    type: String,
    required: true,
  },
  facebookURL: {
    type: String,
  },
  instagramURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  youtubeURL: {
    type: String,
  },
});

const Info = mongoose.model("Info", infoSchema);
module.exports = Info;
