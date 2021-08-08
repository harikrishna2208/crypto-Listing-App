const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Titan:vLUpS06KfdEh7WE4@cluster0.e37m2.mongodb.net/cryptodata",
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
