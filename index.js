require("dotenv").config();
const express = require("express");
require("./src/db/mongoose");
const User = require("./src/models/userModel");
const userRouter = require("./src/routers/userRouter");
const Producttype = require("./src/models/productTypeModel");
const productTypeRouter = require("./src/routers/productTypeRouter");
const Product = require("./src/models/productModel");
const productRouter = require("./src/routers/productRouter");

const app = express();

app.use(express.json());
//express is framework for node js

const port = process.env.PORT || 3000;
app.use(userRouter);
app.use(productTypeRouter);
app.use(productRouter);
app.listen(port, () => {
  console.log("Server is runnning on port : ", port);
});
