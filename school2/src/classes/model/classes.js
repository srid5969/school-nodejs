const mongoose = require("mongoose");
const moment = require("moment-timezone");
var AutoIncrement = require('mongoose-sequence')(mongoose);

const classesSchema = new mongoose.Schema({
  id:{type:Number,unique:true},

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
},
{
  versionKey: false 
});
classesSchema.plugin(AutoIncrement, {id:'class',inc_field: 'id'});

module.exports = mongoose.model("classes", classesSchema);
