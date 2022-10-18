const express = require("express");

const app = express();
const studentRouter = require("./routers/studentRouter");
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/my-student-2")
  .then(() => console.log("connectted Mongodb"))
  .catch((err) => console.log("connection failled"));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/students", studentRouter);

app.get("/", (req, res) => {
  res.send("hello from express js");
});

const port = 3000;

app.listen(port, () => {
  console.log("Lising on port ${port}...");
});

/// Mongoose --> Model  ---.> Collecton
// Import Model
// Connect Database
