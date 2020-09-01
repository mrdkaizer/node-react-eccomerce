const mongoose = require("mongoose");

//connect to db
require("../db/mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    unique: true,
  },
});

categorySchema.pre("save", async function (next) {
  const category = this;
  if (category.isModified("name")) {
    let trylink = category.name
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    let link = trylink;
    let i = 1;
    while (
      await Category.findOne({
        link: trylink,
      })
    ) {
      trylink = link + "-" + i;
      i++;
    }
    category.link = trylink;
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
