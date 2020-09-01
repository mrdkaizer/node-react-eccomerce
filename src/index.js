const express = require("express");

const userRouter = require("./routers/user");
const customerRouter = require("./routers/customer");
const infoRouter = require("./routers/info");
const categoryRouter = require("./routers/category");
const pageRouter = require("./routers/page");
const productRouter = require("./routers/product");
const orderRouter = require("./routers/order");

const app = express();
if (process.env.NODE_ENV === "development") {
  console.log("true");
  const cors = require("cors");
  app.use(cors());
}
const port = process.env.port || 3001;

app.use(express.json());
app.use(userRouter);
app.use(infoRouter);
app.use(categoryRouter);
app.use(pageRouter);
app.use(customerRouter);
app.use(productRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
