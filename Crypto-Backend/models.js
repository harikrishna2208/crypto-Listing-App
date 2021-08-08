const mongoose = require("mongoose");
const CryptoDataSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Symbol: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    require: true,
  },
  Image: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("crypto", CryptoDataSchema);
