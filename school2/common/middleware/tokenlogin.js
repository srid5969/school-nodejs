const usertoken = require("../../src/usertoken/model/usertoken");
module.exports = async (req, res, next) => {
  let Token = req.headers.authorization;
  let url = req.originalUrl;
  console.log(`192.168.0.123:8080${url} \t ${req.method}`);
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
        res.status(408).send("Token is Not Valid ");
      }
    } else {
      res.send("Please Login properly ");
    }
  }
};
