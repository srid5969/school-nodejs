const bcrypt = require("bcrypt");
const users = require("../../src/users/model/users");
const userToken = require("../../src/usertoken/model/usertoken");
const event = require("../events/users");

module.exports = async (req, res, next) => {
  let originalUrl = req.originalUrl;
  console.log(`\n\n \t 192.168.0.123:8080${originalUrl} \t ${req.method}`);
  let username = req.body.username;
  let password = req.body.password;
  let Token = req.headers.authorization;

  if (originalUrl === "/user/login") {
    if (username && password) {
      const data1 = await users.findOne({ email: username });
      const data = await data1.password;
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
          res.json("Wrong password please check the password");
        }
      } else {
        res.json("Please add username and password");
      }
    } else {
      res.json("Please add username and password");
    }
    //
  } else if (originalUrl=='/user/logout') {
    // console.log(Token);
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
        res.json("Token Is not valid");
      }
    }
  } else if (originalUrl == "/user/logoutall") {
    // console.log(Token);
    if (Token) {
      let TokenData = await userToken
        .findOne({ token: Token })
        .populate({ path: "users" });
      const TokenIsValid = await userToken.update(
        {},
        { $set: { status: "Inactive" } }
      );
      if (TokenIsValid) {
        await userToken.findOneAndUpdate(
          { token: Token },
          { status: "Inactive" }
        );
        await event.emit("inactive", await TokenIsValid.users);
        next();
      } else {
        res.json("Token Is not valid");
      }
    }
  }
  if (originalUrl === "user/logout") {
    res[0].json("Thank  You");
    res[1].json("Thank  You");
  } else {
    let TokenData = await userToken
      .findOne({ token: Token })
      .populate({ path: "users" });
    if (TokenData) {
      // console.log(TokenData);
      userDetail = TokenData.users;
      userId = userDetail._id;
      if (Token) {
        // var du = await classes.find();
        // for (let i = 0; i < du.length; i++) {
        //   if (originalUrl === "/class/".concat(du[i].name.replace(" ", "%20")))
        //     var classPatch = "/class/".concat(du[i].name.replace(" ", "%20"));
        //   break;
        // }

        if (userDetail.role) {
          if (userDetail.role === "Teacher") {
            if (
              !(
                originalUrl == "/teacher/all" ||
                originalUrl === "/user/signup" ||
                originalUrl === "user/all" ||
                originalUrl === "user/login" 
                
              )
            ) {
              next();
              console.log("\t Accessed by \t", userDetail.role);
              console.log("\t Token : ", Token, "\n");
            } else {
              console.log("\t Access Denied")
              res.status(404).json("user is unauthorized");
            }
          } else if (userDetail.role === "Principle") {
            if (
              !(  originalUrl == "/user/login")
            ) {
              next();
              console.log("\t Token : ", Token, "\n");
              console.log("\t Accessed by \t", userDetail.role);
            }else {
              console.log("\t Access Denied")
              res.status(404).json("user is unauthorized");
            }
          } else {
            console.log("\t Accessed by \t", userDetail.role);
            console.log("\t Token : ", Token, "\n");
            next();
          }
        } else {
          res.json("Please Enter The token");
        }
      }
    } else {
      if (originalUrl !== "/user/login") res.json("Token is invalid");
    }
  }
};
