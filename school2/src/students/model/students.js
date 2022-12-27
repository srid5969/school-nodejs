const mongoose = require("mongoose");
const moment = require("moment-timezone");

const StudentsSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
      unique: true,
    },

    firstName: {
      type: String,

      unique: true,
    },
    lastName: {
      type: String,
    },
    classid: {
      type: mongoose.Types.ObjectId,
      ref: "classes",

      index: true,
    },
    dob: {
      type: Date,
    },
    fathername: {
      type: String,
    },

    mothername: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
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
StudentsSchema.index({ classid: 1, id: 1 });
// StudentsSchema.plugin(AutoIncrement, {id:'student',startAt: 50,inc_field: 'id'});

module.exports = mongoose.model("students", StudentsSchema);
