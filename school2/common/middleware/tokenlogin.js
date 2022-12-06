const usertoken = require("../../src/usertoken/model/usertoken");
module.exports = async (req, res, next) => {
  let Token = req.headers.authentication;
  let url = req.originalUrl;
  if (url !== "/user/login" || url !== "/user/signup") {
    if (Token) {
      const data = await usertoken.findOne({ token: Token });
      // .populate({ path: "users" });
      if (data) {
        next();
      } else {
        res.send("Please Login properly ");
      }
    } else {
      res.send("Please Login properly ");
    }
  } else {
    next();
  }
};