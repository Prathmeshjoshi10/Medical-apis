const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017/medical";

//mongoose connection with url
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
});
