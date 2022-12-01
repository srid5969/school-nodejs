const mongoose = require("mongoose");

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
    type: Date,
    default: Date.now,
  }
});
module.exports = mongoose.model("teacherattendance", teachersAttendanceSchema);
