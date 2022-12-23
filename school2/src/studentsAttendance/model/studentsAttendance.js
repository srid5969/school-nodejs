const mongoose = require("mongoose");
const moment = require("moment-timezone");
var AutoIncrement = require('mongoose-sequence')(mongoose);

const studentAttendanceSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },

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
  },
  {
    versionKey: false,
  }
);
studentAttendanceSchema.plugin(AutoIncrement, {id:'studentAttendance',inc_field: 'id'});

module.exports = mongoose.model("studentAttendance", studentAttendanceSchema);
