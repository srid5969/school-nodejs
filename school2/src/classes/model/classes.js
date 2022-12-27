const mongoose = require("mongoose");
const moment = require("moment-timezone");

const classesSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  name: { type: String,  unique: true },
  classTeacher: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm "),
  }
},
{
  versionKey: false 
});
classesSchema.index({id:1},{unique: true})
module.exports = mongoose.model("classes", classesSchema);
