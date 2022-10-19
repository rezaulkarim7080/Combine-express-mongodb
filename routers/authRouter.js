const express = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../models/user");
const { route } = require("./studentRouter");
const router = express.Router();

const authUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Invalid email or password!");

  const validUser = bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(404).send("Invalid email or password!");

  const token = user.generateJWT();
  res.send({ token: token });
};

router.route("/").post(authUser);

module.exports = router;
