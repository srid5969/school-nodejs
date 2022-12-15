const mongoose = require("mongoose");
const moment = require('moment-timezone');
const teachersAttendanceSchema = new mongoose.Schema({
  userId: {
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
  },
  createDate: {
    type: String,
    default:moment().format("YYYY-MM-DD hh:mm")
  }
});
module.exports = mongoose.model("teacherattendance", teachersAttendanceSchema);
