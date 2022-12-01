const mongoose = require("mongoose");

const studentAttendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Types.ObjectId,
    ref: "Classes",
  },
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "student",
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
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("studentsAttendance", studentAttendanceSchema);
