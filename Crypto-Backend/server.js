const MangoDB =require("./Apikey")
const express = require("express");
const app = express();
const cors = require("cors");
console.log(MangoDB.ID)
const mongoose = require("mongoose");
mongoose.connect(
  MangoDB.ID,
  { useNewurlParser: true }
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(cors());

app.use(express.json());
const cryptoData = require("./CryptoDataRouter");
app.use("/cryptoData", cryptoData);

app.listen(4000, () => console.log("Listening to the port 4000"));
