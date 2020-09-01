const mongoose = require("mongoose");

//connect to db
require("../db/mongoose");

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    unique: true,
  },
});

pageSchema.pre("save", async function (next) {
  const page = this;
  if (page.isModified("title")) {
    let trylink = page.title
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    let link = trylink;
    let i = 1;
    while (await Page.findOne({
        link: trylink
      })) {
      trylink = link + "-" + i;
      i++;
    }
    page.link = trylink;
  }
  next();
});

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;