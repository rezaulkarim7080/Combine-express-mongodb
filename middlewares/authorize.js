const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //// Get the token From request header
  //Authorization : Bearer <token>

  let token = req.header("Authorization");
  if (!token) res.status(404).send("Access denied No token Provided !");
  token = token.split(" ")[1].trim();

  // verify the token
  try {
    const decoded = jwt.verify(token, process.env.mySerectKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }

  /// Error Message
};
