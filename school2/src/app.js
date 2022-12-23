'use strict'
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const classes = require("./classes/controller/classes");
const users = require("./users/controller/users");
const manager = require("../common/config/manager.ts");
const studentsAttendance = require("./studentsAttendance/controller/studentsAttendance");
const teachersAttendance = require("./TeacherAttendance/controller/teachersAttendance");
const students = require("./students/controller/students");
const commonMiddleware = require("../common/middleware/commonmiddleware");
const csvController = require("./report/controller/csv_controller");
const email = require("./report/emailcontroller/email");


const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.connect(manager);
const database = mongoose.connection;
database.on("error", (error) => console.error());
database.once("connected", () => {  console.log("Database Connected");});

app.use(commonMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use("/download", email);
app.use("/class", classes);
app.use("/user", users);
app.use("/student/attendance", studentsAttendance);
app.use("/teacher/attendance", teachersAttendance);
app.use("/student", students);
app.use("/csv", csvController);

app.listen(8080, () => {console.log(`Server Started at 8080`);});
