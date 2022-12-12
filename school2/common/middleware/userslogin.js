const users = require("../../src/users/model/users");

module.exports = async (req, res, next) => {
  let originalUrl = req.originalUrl;
  let username = req.headers.username;
  let Password = req.headers.password;
  if (originalUrl == "/user/login") {
    const data = await users.findOne({ email: username });
    if (data.role == "Principle") {
      if (originalUrl == "/user/login" || originalUrl == "/signup") {
        next();
      } else {
        res.json({ message: "Access Denied" });
      }
    } else if (data.role == "Teacher") {
      if (originalUrl == "/user/login") {
        next();
      } else {
        res.json({ message: "Access Denied" });
      }
    }
  } else {
    next();
    // res.send("User Login MiddleWare")
  }
  if (userDetail.role == "Principle") {
    if (
      originalUrl == "/user/login/" ||
      originalUrl == "/student" ||
      originalUrl == "/student/all" ||
      originalUrl == "/students" ||
      originalUrl == "/students/all" ||
      originalUrl == "/class" ||
      originalUrl == "/class/all" ||
      originalUrl == "/teacher/all" ||
      originalUrl == "/teacher"
    ) {
      console.log("Principle\t" + userDetail.role);

      next();
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } else if (userDetail.role == "Teacher") {
    if (
      originalUrl == "/user/login/" ||
      originalUrl == "/student" ||
      originalUrl == "/student/all" ||
      originalUrl == "/students" ||
      originalUrl == "/students/all" ||
      originalUrl == "/class" ||
      originalUrl == "/class/all"
    ) {
      console.log("Teacher\t" + userDetail.role);
      next();
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } else if (userDetail.role == "Admin") {
    next();
    console.log("Admin\t" + userDetail.role);

    // res.send("User Login MiddleWare")
  }
};
