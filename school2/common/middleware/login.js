const bcrypt = require("bcrypt");
const users = require('../../src/users/model/users')
// const getUserFromToken = require("../getUserFromToken");

module.exports = async (req, res, next) => {
  let originalUrl = req.originalUrl;
  let username = req.headers.username;
  let password = req.headers.password;
  if ((originalUrl == "/user/login")) {
    if (username && password) {
      const data = (
        await users.findOne({ "email": username })).password;

      if (data) {
        const Data = await bcrypt.compare(password, data);

        if (Data) {
          next();
        } else {
          res.json({ WrongPassword:"Wrong password please check the password"});
        }
      }

      next();
    } else {
      res.send("Please add username and password")
    }
  } else if ((originalUrl == "/user/signup")) {
    console.log(originalUrl)
    next();
  }
};
