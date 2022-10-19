const express = require("express");

const app = express();
const studentRouter = require("./routers/studentRouter");
const UserRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/students", studentRouter);
app.use("/api/user", UserRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("hello from express js");
});

module.exports = app;

/// Authentication -->
// User-->table/collection --> email,password

//Authorization ----> access to content/data
