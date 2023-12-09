const bcrypt = require("bcryptjs");
module.exports = async () => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return salt;
};
