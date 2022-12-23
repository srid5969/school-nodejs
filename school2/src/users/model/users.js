const mongoose = require("mongoose");
const moment = require("moment-timezone");
var AutoIncrement = require('mongoose-sequence')(mongoose);

const usersSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
     
      
    },
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    phoneCode: {
      type: Number,
      default: 91,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    createDate: {
      type: String,
      default: moment().format("YYYY-MM-DD hh:mm"),
    },
    role: {
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
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

usersSchema.plugin(AutoIncrement, {id:'user',inc_field: 'id'});

module.exports = mongoose.model("users", usersSchema);
