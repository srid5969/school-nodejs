const mongoose = require("mongoose");
const moment = require("moment-timezone");

const studentAttendanceSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },


    class: {
      type: mongoose.Types.ObjectId,
      ref: "classes",
    },
    student: {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },
    status: {
      type: String,
    },
    date: {
      type: Date,
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
studentAttendanceSchema.index({id:1})
// studentAttendanceSchema.plugin(AutoIncrement, {
//   id: "studentAttendance",startAt: 50,
//   inc_field: "id",
// });
studentAttendanceSchema.pre('save',async()=>{

})
module.exports = mongoose.model("studentAttendance", studentAttendanceSchema);
