const users = require("../../src/users/model/users");
const userToken = require("../../src/usertoken/model/usertoken");

module.exports = async (req, res, next) => {
  let Token = req.headers.authorization;
  let url = req.originalUrl;
  
  if (
    url !== "/user/login" ||
    url !== "/user/signup" ||
    url !== "/user/logout"
  ) {
    if (Token) {
      const data = await userToken
        .findOne({ token: Token })
        .populate({ path: "users" });
      if (data) {
        userid = data.users._id;
         userDetail = data.users;

        next();
        // res.send(data)
      } else {
        res.status(408).send("Token Is Not Valid");
      }
    } else {
      next();
    }
  }
};
