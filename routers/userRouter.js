const express = require("express");
const { User } = require("../models/user");
const { route } = require("./studentRouter");
const router = express.Router();

/// Check user By Email

const newUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User already registred!");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const result = await user.save();
    res.send({ name: result.name, email: result.email });
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};
router.route("/").post(newUser);
module.exports = router;
