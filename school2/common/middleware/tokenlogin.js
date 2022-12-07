const usertoken = require("../../src/usertoken/model/usertoken");
module.exports = async (req, res, next) => {
  let Token = req.headers.authorization;
  let url = req.originalUrl;
  if (url == "/user/login" || url == "/user/signup"||url=='/user/logout/') {
    next();
  } else {
    if (Token) {
      const data = await usertoken
        .findOne({ token: Token })
        .populate({ path: "users" });
      // console.log(data);
      // .populate({ path: "users" });
      if (data) {
        next();
      } else {
        res.send("Token is Not Valid ");
      }
    } else {
      res.send("Please Login properly ");
    }
  }
};
