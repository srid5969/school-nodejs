const bcrypt = require("bcrypt");
const users = require("../../src/users/model/users");
const userToken = require("../../src/usertoken/model/usertoken");
const event = require("../events/users");
module.exports = async (req, res, next) => {
  let originalUrl = req.originalUrl;
  console.log(`192.168.0.123:8080${originalUrl} \t ${req.method}`);
  let username = req.headers.username;
  let password = req.headers.password;
  let Token = req.headers.authorization;
  if (originalUrl === "/user/login") {
    if (username && password) {
      const data1 = await users.findOne({ email: username });
      const data = data1.password;
      event.emit("active", data1._id);
      if (data && data1) {
        const Data = await bcrypt.compare(password, data);
        if (Data) {
          const id = data1._id;
          await userToken.deleteMany({ users: id });
          const N = 30;
          const generatedToken = await Array(N + 1)
            .join((Math.random().toString(36) + "8782").slice(2, 18))
            .slice(0, N);
          const token = await userToken({
            users: data1,
            token: generatedToken,
            status: "Active",
          });

          usersTokenWithPassword = await token.save();
          let result = usersTokenWithPassword;
          result = result.toObject();
          delete result.users.password;
          usersToken = result;
          next();
        } else {
          res.send("Wrong password please check the password");
        }
      } else {
        res.send("Please add username and password");
      }
    } else {
      res.send("Please add username and password");
    }
    //
  } else if (originalUrl == "/user/logout") {  
    console.log(Token);

    if (Token) {
      let TokenData = await userToken
        .findOne({ token: Token })
        .populate({ path: "users" });
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
    }
  }else if(originalUrl == "/user/logoutall")
  {
    console.log(Token);

    if (Token) {
      let TokenData = await userToken
        .findOne({ token: Token })
        .populate({ path: "users" });
      const TokenIsValid = await userToken.update({},{$set:{status:"Inactive"}});
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
    }
  }

  if (originalUrl === "user/logout") {
    res[0].send("Thank  You");
    res[1].send("Thank  You");
  } else {
    let TokenData = await userToken
      .findOne({ token: Token })
      .populate({ path: "users" });
    if (TokenData) {
      console.log(TokenData);
      userDetail = TokenData.users;
      userId = userDetail._id;
      if (Token) {
        if (userDetail.role) {
          if (userDetail.role === "Teacher") {
            if (
              (originalUrl === "/teacher" && req.method === "GET") ||
              (originalUrl === "/teacher" && req.method === "PATCH") ||
              originalUrl == "/student" ||
              originalUrl == "/student/all" ||
              originalUrl == "/students" ||
              originalUrl == "/students/all" ||
              originalUrl == "/class" ||
              originalUrl == "/class/all"
            ) {
              next();
              console.log(userDetail.role);
            } else {
              res.status(404).send("user is unauthorized");
            }
          } else if (userDetail.role === "Principle") {
            if (
              originalUrl === "user/signup" ||
              originalUrl === "user/all" ||
              originalUrl === "/teacher" ||
              originalUrl == "/student" ||
              originalUrl == "/student/all" ||
              originalUrl == "/students" ||
              originalUrl == "/students/all" ||
              originalUrl == "/class" ||
              originalUrl == "/class/all" ||
              originalUrl == "/teacher/all"
            ) {
              next();
              console.log(userDetail.role);
            }
          } else {
            console.log(userDetail.role);
            next();
          }
        } else {
          res.send("Please Enter The token");
        }
      }
    } else {
      if (originalUrl !== "/user/login") res.send("Token is invalid");
    }
  }
};