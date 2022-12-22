const mongoose = require("mongoose");
const moment = require("moment-timezone");

const studentAttendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Types.ObjectId,
    ref: "classes",
  },
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "students",
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: moment().format("YYYY-MM-DD"),

  },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm"),
  },
});
module.exports = mongoose.model("studentAttendance", studentAttendanceSchema);
