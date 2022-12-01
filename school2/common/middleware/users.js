const bcrypt = require("bcrypt");
const users = require("../../src/users/model/users");

exports = async function (req, res, next) {
  try {
    const login = await bcrypt.compare(password, users.password);
    if (!login) {
      next();
    }else{
        throw new Error('Password is incorrect');
    }
  } catch (error) {
    throw error;
  }
};
