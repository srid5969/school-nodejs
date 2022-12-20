const mongoose = require("mongoose");
const moment = require("moment-timezone");

const classesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  classTeacher: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm "),
  }
});
module.exports = mongoose.model("classes", classesSchema);
