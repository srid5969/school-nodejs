const mongoose = require("mongoose");
const moment = require("moment-timezone");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const teachersAttendanceSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },

    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
    status: {
      type: String,
      required: true,
      default: "Inactive",
    },
    date: {
      type: String,
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
teachersAttendanceSchema.plugin(AutoIncrement, {
  id: "teacherAttendance",
  inc_field: "id",
});

module.exports = mongoose.model("teacherAttendance", teachersAttendanceSchema);
