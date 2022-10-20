const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const { route } = require("./studentRouter");
const authorize = require("../middlewares/authorize");
const router = express.Router();

/// Check user By Email ////

const newUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User already registred!");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    const result = await user.save();
    const token = user.generateJWT();
    res.send({ token: token, data: { name: result.name, email: result.email } });
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};

router.route("/").post(newUser);

router.route("/me").get(authorize, (req, res) => {
  res.send(req.user);
});

module.exports = router;
