
const express = require("express");
const router = express.Router();
const crypto = require("./models");

router.get("/getcrypto", async (req, res) => {
  try {
    const crypt = await crypto.find();
    res.json(crypt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/post", async (req, res) => {
  const replicated = await crypto.find({ Name: req.body.name });

  if (Object.keys(replicated).length > 0) {
    res.status(200).json(replicated);
  } else {
    const cryptopost = new crypto({
      Name: req.body.name,
      Price: req.body.price,
      Symbol: req.body.symbol,
      Image: req.body.image,
    });
    try {
      const newCrypto = await cryptopost.save();
      res.status(201).json(newCrypto);
    } catch (err) {
      res.status(400);
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const crypt = await crypto.findById(req.params.id);
    await crypt.remove();
    res.status(201).json(crypt);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
