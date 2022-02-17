const mongoose = require("mongoose");

const productTypeSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
});

const Producttype = mongoose.model("Producttype", productTypeSchema);
module.exports = Producttype;
