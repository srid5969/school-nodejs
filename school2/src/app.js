const express = require("express");
const mongoose = require("mongoose");
const classes = require("./classes/controller/classes");
const users = require("./users/controller/users");
const manager = require("../common/config/manager.ts");
const login = require("../common/middleware/login");
const userVerification = require("../common/middleware/userslogin");
const tokenLogin = require("../common/middleware/tokenlogin");


const app = express();
app.use(login);
app.use(userVerification);
app.use(tokenLogin)
mongoose.connect(manager);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});
app.use(express.json());
app.use("/class", classes);
app.use("/user", users);

app.listen(8080, () => {
  console.log(`Server Started at 8080`);
});