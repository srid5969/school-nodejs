const bcrypt = require("bcrypt");
const users = require("../../src/users/model/users");
const userToken = require("../../src/usertoken/model/usertoken");
const event = require("../events/users");

const N = 30;
const generatedToken = Array(N + 1)
  .join((Math.random().toString(36) + "8782").slice(2, 18))
  .slice(0, N);

module.exports = async (req, res, next) => {
  let originalUrl = req.originalUrl;
  let username = req.headers.username;
  let password = req.headers.password;
  let Token = req.headers.authorization;
  if (originalUrl === "/user/login") {
    if (username && password) {
      const data = (await users.findOne({ email: username })).password;
      const data1 = await users.findOne({ email: username }); //id
      event.emit("active",(data1._id));
      if (data) {
        const Data = await bcrypt.compare(password, data);

        if (Data) {
          const id = data1._id;
          await userToken.deleteMany({ users: id });
          const token = await userToken({
            users: data1,
            token: generatedToken,
            status: "Active",
          });
          token.save().then((tada) => res.send(tada));
          // next();
        } else {
          res.json({
            WrongPassword: "Wrong password please check the password",
          });
        }
      }
    } else {
      res.send("Please add username and password");
    }
  } else if (originalUrl == "/user/signup") {
    next();
  } else if (originalUrl == "/user/logout") {
    console.log(Token);

    if (Token) {
      const TokenIsValid = await userToken.findOne({ token: Token });
      if (TokenIsValid) {
        await userToken.findOneAndUpdate(
          { token: Token },
          { status: "Inactive" }
        );
        await event.emit("inactive", await TokenIsValid.users);
        next();
      } else {
        res.send("Token Is not valid");
      }
    } else {
      res.send("Please Enter Token");
    }
  } else {
    next();
  }
};
console.log('=====================================')
console.log('=====================================')
console.log('=====================================')
console.log('=====================================')
console.log('=====================================')
console.log('=====================================')
console.log('=====================================')
console.log('=====================================')
console.log('=====================================')

