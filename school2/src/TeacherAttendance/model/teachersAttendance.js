const mongoose = require("mongoose");
const moment = require("moment-timezone");

const teachersAttendanceSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },

    userId: {
      type: mongoose.Types.ObjectId,

      ref: "users",
    },
    status: {
      type: String,
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
teachersAttendanceSchema.index({id:1})
// teachersAttendanceSchema.plugin(AutoIncrement, {
//   id: "teacherAttendance",startAt: 50,
//   inc_field: "id",
// });
module.exports = mongoose.model("teacherAttendance", teachersAttendanceSchema);
