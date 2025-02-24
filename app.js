const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Good = require("./models/goods");

mongoose
  .connect("mongodb://localhost:27017/test_db")
  .then(() => {
    console.log("成功連結mongoDB ~ ~ ~");
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/goods", async (req, res) => {
  try {
    let goodData = await Good.find({}).exec();
    // return res.send(goodData);
    res.render("goods", { goodData });
  } catch (e) {
    return res.status(500).send("尋找資料時發生錯誤QQ");
  }
});

app.get("/", (req, res) => {
  return res.render("new-product");
});

app.get("/goods/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundGood = await Good.findOne({ _id }).exec();
    if (foundGood != null) {
      res.render("records", { foundGood });
    } else {
      return res.status(400).render("good-not-found");
    }
  } catch (e) {
    return res.status(400).render("good-not-found");
  }
});

app.post("/goods", async (req, res) => {
  try {
    let { date, coloredPaper, hangingScroll, keyChain, manga, totalMoney } =
      req.body;
    let newGood = new Good({
      date,
      coloredPaper,
      hangingScroll,
      keyChain,
      manga,
      totalMoney,
    });
    let savedGood = await newGood.save();
    return res.render("good-save-success", { savedGood });
  } catch (e) {
    return res.render("cart-not-found", { e });
  }
});

class NewData {
  constructor() {}
  setProperty(key, value) {
    this[key] = value;
  }
}

app.patch("/goods/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let newObject = new NewData();
    for (let property in req.body) {
      newObject.setProperty(property, req.body[property]);
    }
    let newData = await Good.findByIdAndUpdate({ _id }, newObject, {
      new: true,
      runValidators: true,
    });
    return res.send({ msg: "成功更新資料", updatedData: newData });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete("/goods/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteResult = await Good.deleteOne({ _id });
    return res.send(deleteResult);
  } catch (e) {
    res.status(500).send("無法刪除資料");
  }
});
app.listen(3000, () => {
  console.log("正在聆聽port 3000");
});
