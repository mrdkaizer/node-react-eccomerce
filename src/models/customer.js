const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//connect to db
require("../db/mongoose");

const customerSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
