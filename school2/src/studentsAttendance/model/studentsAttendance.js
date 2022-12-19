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
  dates: {
    type: Date,
    required: true,
  },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm"),
  },
});
module.exports = mongoose.model("studentAttendance", studentAttendanceSchema);
