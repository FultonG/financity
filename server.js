require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/db");

const PORT = process.env.PORT || 3001;

db.then(() => console.log("Connected to MongoDB.")).catch((err) =>
  console.log(err)
);

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ msg: "Default endpoint" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
