const express = require("express");
const mongoose = require("mongoose");
const manager = require("../config/manager.ts");
const classes = require("./classes/controller/classes");
const users = require("./users/controller/users");


const app = express();

mongoose.connect(manager);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});
app.use(express.json());
// app.use("/", classes);
app.use("/use", users);
app.listen(8080, () => {
  console.log(`Server Started at 8080`);
});
