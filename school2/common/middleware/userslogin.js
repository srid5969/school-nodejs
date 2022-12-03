const users = require('../../src/users/model/users')

module.exports = async (req, res, next) => {
    let originalUrl = req.originalUrl;
    let username = req.headers.username;
    let password = req.headers.password;
    if ((originalUrl == "/user/login")) {
        const data = await users.findOne({ "email": username })
        if (data.role == "Admin") {
            next();
        } else if (data.role == "Principle") {
            if ((originalUrl == "/user/login") || (originalUrl == '/signup')) {
                next()
            } else {
                res.json({ message: "Access Denied" })
            }
        } else if (data.role == "Teacher") {
            if ((originalUrl == "/user/login")) {
                next()
            } else {
                res.json({ message: "Access Denied" })
            }
        }
    }
}