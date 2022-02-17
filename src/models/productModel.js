const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    expireydate: {
      type: Date,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // liked: {
    //   type: Boolean,
    //   default: false,
    // },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
