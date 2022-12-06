const bcrypt = require("bcrypt");
const users = require("../../src/users/model/users");

// const getUserFromToken = require("../getUserFromToken");
const usertoken = require("../../src/usertoken/model/usertoken");
const N = 30;
const generatedToken = Array(N + 1)
  .join((Math.random().toString(36) + "8782").slice(2, 18))
  .slice(0, N);

module.exports = async (req, res, next) => {
  let originalUrl = req.originalUrl;
  let username = req.headers.username;
  let password = req.headers.password;
  if (originalUrl === "/user/login") {
    if (username && password) {
      const data = (await users.findOne({ email: username })).password;
      const data1 = await users.findOne({ email: username });
      if (data) {
        const Data = await bcrypt.compare(password, data);

        if (Data) {
          const token = await usertoken({
            users: data1,
            token: generatedToken,
            status: "Active",
          });
          token.save();
          next();
        } else {
          res.json({
            WrongPassword: "Wrong password please check the password",
          });
        }
      }

      next();
    } else {
      res.send("Please add username and password");
    }
  } else if (originalUrl == "/user/signup") {
    console.log(originalUrl);
    next();
  }else{
    next()
  }
};
