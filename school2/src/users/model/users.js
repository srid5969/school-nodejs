const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const moment = require('moment-timezone');


const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
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
    required: true,
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
    default:moment().format("YYYY-MM-DD hh:mm")
  },
  role:{
    type: String,
    required: true
  },
  address1:{
    type: String,
    required: true
  },
  address2:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  },
  pincode:{
    type: Number,
    required: true
  },
  status:{
    type: String,
    required: true
  }
});

usersSchema.pre('save' ,async function (next){
try {
	const salt = await bcrypt.genSalt(10)
	const hashedPassword=await bcrypt.hash(this.password,salt)
	this.password=hashedPassword
	next()
} catch (error) {
	next(error)
}
})
module.exports = mongoose.model("users", usersSchema);
