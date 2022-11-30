const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  classTeacher: {
    type: mongoose.Types.ObjectId, 
    ref: "Users", required: true },
  dob:{
    type:Date,
    required: true,
    },
  fathername: {
    type:String,
    required: true,
  },

  mothername: {
    type:String,
    required: true,
  },
  address1: {
    type:String,
    required: true,
  },
  address2: {
    type:String,
    required: true,
  },
  city: {
    type:String,
    required: true,
  },
  pincode: {
    type:Number,
    required: true,
  },
  createdate: {
    type:Date,
    required: true,
  }
});
module.exports = mongoose.model("Users", usersSchema);