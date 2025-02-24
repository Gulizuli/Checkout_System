const mongoose = require("mongoose");
const { Schema } = mongoose;

const goodsSchema = new Schema({
  date: { type: Date, default: Date.now },
  coloredPaper: { type: Number, default: 0 },
  hangingScroll: { type: Number, default: 0 },
  keyChain: { type: Number, default: 0 },
  manga: { type: Number, default: 0 },
  totalMoney: { type: Number, default: 0, min: [1, "購物車沒有東西喔"] },
});

const Good = mongoose.model("Good", goodsSchema);
module.exports = Good;
