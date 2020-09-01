const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//connect to db
require("../db/mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    unique: true,
  },
  available: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  pricePreDiscount: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  categories: [
    {
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    },
  ],
  images: [
    {
      image: {
        type: String,
        required: false,
      },
    },
  ],
});

productSchema.pre("save", async function (next) {
  const product = this;
  if (product.isModified("name")) {
    let trylink = product.name
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    let link = trylink;
    let i = 1;
    while (
      await Product.findOne({
        link: trylink,
      })
    ) {
      trylink = link + "-" + i;
      i++;
    }
    product.link = trylink;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
