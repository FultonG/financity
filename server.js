require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const {
  student,
  teacher,
  account,
  deposit,
  purchase,
  customer,
  realtor,
  class_,
  job,
  question,
  stock,
} = require("./routes");
const db = require("./db/db");

const PORT = process.env.PORT || 3001;

db.then(() => console.log("Connected to MongoDB.")).catch((err) =>
  console.log(err)
);

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

app.use("/student", student);
app.use("/teacher", teacher);
app.use("/account", account);
app.use("/deposit", deposit);
app.use("/purchase", purchase);
app.use("/customer", customer);
app.use("/realtor", realtor);
app.use("/class", class_);
app.use("/job", job);
app.use("/question", question);
app.use("/stock", stock);

app.get("/", (req, res) => {
  res.send({ msg: "Default endpoint" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
