const bcrypt = require("bcrypt");

// const getUserFromToken = require("../getUserFromToken");

module.exports = async (req, res, next) => {
  let originalUrl = req.originalUrl;
  let username = req.headers.user;
  let password = req.headers.password;
  if ((originalUrl = "/login")) {
    if (username && password) {
      const data = (
        await users.aggregate([
          ({
            $match: {
              email: username,
            },
          },
          {
            $group: {
              _id: "$password",
            },
          }),
        ])
      ).pop()._id;

      if (data) {
        const Data = await bcrypt.compare(password, data);
        if (Data) {
          return "Welcome ";
        } else {
          return "Wrong password please check the password";
        }
      }

      next();
    }else{
        res.send("Please add username and password")
    }
  } else if ((originalUrl = "/user/signup")) {
    next();
  }
};
