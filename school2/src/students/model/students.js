const mongoose = require("mongoose");
const moment = require("moment-timezone");
const StudentsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
  },
  classid: {
    type: mongoose.Types.ObjectId,
    ref: "classes",
    required: true,
    index: true 
  },
  dob: {
    type: Date,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },

  mothername: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm"),
  },
});
StudentsSchema.index({ classid: 1 });

module.exports = mongoose.model("students", StudentsSchema);
