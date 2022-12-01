const { DATE } = require("mysql/lib/protocol/constants/types");
const sql = require("./app/models/db.js");
module.exports = function (options) {
  return function (req, result, next) {
    let originalUrl = req.originalUrl;
    let authorization = req.headers.authorization;
    if (
      (originalUrl == "/api/user" && req.method == "POST") ||
      (originalUrl == "/api/user/otp" && req.method == "POST") ||
      (originalUrl == "/api/user/login" && req.method == "POST")
    ) {
      next();
    } else {
      sql.query(
        `SELECT A.userid, B.role, B.status, B.firstname, B.subscription, B.validity FROM UserSession as A LEFT JOIN Users 
        as B ON A.userid = B.id WHERE A.loginid = '${authorization}' AND A.status = 'active'`,
        (err, res) => {
          if (err) {
            result.status(400).send({
              message: "Invalid request!",
            });
          }
          if (res.length == 0) {
            result.status(400).send({
              message: "Invalid request!",
            });
          } else {
            //Public value set
            req.userId = res[0].userid;
            req.userRole = res[0].role;
            req.userStatus = res[0].status;
            req.userName = res[0].firstname;

            if (
              (originalUrl == "/api/user/all" && req.method == "GET") ||
              (originalUrl == "/api/user/status" && req.method == "PATCH") ||
              (originalUrl.includes("/api/subscription/") &&
                req.method == "POST")
            ) {
              if (res[0].role == "admin") {
                next();
              } else {
                result.status(400).send({
                  message: "Access denied!",
                });
              }
            } else if (
              originalUrl == "/api/job/apply" &&
              req.method == "POST"
            ) {
              if (
                res[0].subscription == "active" &&
                res[0].validity > new Date()
              ) {
                next();
              } else {
                result.status(400).send({
                  message: "Subscription required",
                });
              }
            } else {
              next();
            }
          }
        }
      );
    }
  };
};
