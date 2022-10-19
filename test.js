const bcrypt = require("bcryptjs");

/// salt
const genSalt = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash("987", salt);
  console.log(hashPassword);
};

genSalt();
