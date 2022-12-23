const mongoose = require("mongoose");
const moment = require("moment-timezone");
const teachersAttendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users"
  },
  status: {
    type: String,
    required: true,
    default:'Inactive'
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD")
  },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm")
  }
},
{
  versionKey: false 
});
module.exports = mongoose.model("teacherAttendance", teachersAttendanceSchema);
