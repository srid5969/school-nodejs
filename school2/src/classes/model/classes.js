const mongoose = require("mongoose");

const classesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classTeacher: {
     type: mongoose.Types.ObjectId, 
     ref: "Users", required: true },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Classes", classesSchema);
