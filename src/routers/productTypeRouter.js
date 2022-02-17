const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const Producttype = require("../models/productTypeModel");
const Product = require("../models/productModel");

router.post("/createtype", auth, async (req, res) => {
  try {
    const type = new Producttype(req.body);
    const newType = await type.save();

    res.send(newType);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.get("/getalltypes", auth, async (req, res) => {
  Producttype.find({})
    .then((types) => {
      res.send(types);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

module.exports = router;
