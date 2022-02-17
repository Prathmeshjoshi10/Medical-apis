const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const Producttype = require("../models/productTypeModel");
const Product = require("../models/productModel");

router.post("/createproduct", auth, async (req, res) => {
  try {
    const ttype = req.body.type;
    //console.log("Ttype is", ttype);

    const type = await Producttype.find({ type: ttype }); // Check entered type is available in type collection or not.
    // console.log("Type is", type);

    const dbtype = type[0].type;
    console.log("dbtype :", dbtype);

    // console.log("TYpe is ..", type[0].type);
    // console.log("objdata", obj_data);

    if (dbtype !== ttype) {
      return res
        .status(400)
        .send("Invalid Type entered ! Please enter valid type.");
    }

    const product = new Product(req.body);
    const newProduct = await product.save();

    res.send(newProduct);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

//Get All Products

router.get("/getallproducts", auth, async (req, res) => {
  Product.find({})
    .then((products) => {
      res.send(products);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

// Edit Medical product

router.patch("/editproducts/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "expireydate", "type", "price"];
  const isValidOperation = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates !" });
  }

  try {
    const product = await Product.findById(req.params.id);

    //console.log("product is:", product);

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();

    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }

  // Delete Product

  // router.delete("/deleteproduct", async (req, res) => {
  //   try {
  //     console.log("before delete");

  //     Product.findOneAndDelete({ name: req.body.name });
  //     console.log(req.body.name);

  //     // await req.name.remove();
  //     res.send(req.name);
  //   } catch (e) {
  //     res.status(500).send();
  //   }
  // });

  router.get("/deleteproduct/", auth, async (req, res) => {
    console.log(req);
    const result = await Product.findByIdAndDelete(req.params.id);
    try {
      if (!result) {
        res.status(404).json({ success: false, message: "product not found!" });
      }
      return res
        .status(200)
        .json({ success: true, message: "the product is deleted!" });
    } catch (error) {
      res.status(500).json({ message: "Error" });
    }
  });

  // Get product by product types

  router.get("/getproductbytype/:type", auth, async (req, res) => {
    const ptype = req.params.type;
    console.log(ptype);

    const qtype = req.query.type;
    console.log(qtype);
    try {
      console.log("Type = ", req.query.type);
      const products = await Product.find({ type: req.query.type });
      res.send(products);
    } catch (e) {
      res.status(500).send();
    }
  });
});

//Like Product
router.put("/like", auth, async (req, res) => {
  const product = await Product.findById(req.body.productId);

  if (!product) return res.status(400).send("Invalid Product!");

  const updatedProduct = await Product.findByIdAndUpdate(req.body.productId, {
    //liked: true,
    $inc: { likes: 1 },
  });

  if (updatedProduct.liked === true) {
    res.send("Product is Liked !");
  }
});

//Dislike Product

router.put("/dislike", auth, async (req, res) => {
  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send("Invalid Product!");

  const updatedProduct = await Product.findByIdAndUpdate(req.body.productId, {
    //liked: false,
    $inc: { likes: -1 },
  });
  res.send("Product is DisLiked !");
});

//get most liked product

router.get("/mostliked", auth, async (req, res) => {
  const products = await Product.find().sort({ likes: -1 }).limit(1);
  return res.status(200).send(products);
});

//get most recent product

router.get("/mostrecent", auth, async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).limit(1);
  return res.status(200).send(products);
});

module.exports = router;
