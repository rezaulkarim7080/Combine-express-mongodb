const express = require("express");
//const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { route } = require("./studentRouter");
const router = express.Router();

const authUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Invalid email or password!");

  let pass = await User.findOne({ pass: req.body.password });
  if (!pass) return res.status(404).send("Invalid  password!");

  //   const validUser = bcrypt.compare(req.body.password, user.password);
  //   if (!validUser) return res.status(404).send("Invalid email or password!");

  res.send("Login Successful");
};

router.route("/").post(authUser);

module.exports = router;
