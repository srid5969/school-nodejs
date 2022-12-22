const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const moment = require("moment-timezone");

const usersSchema = new mongoose.Schema({
  id: {
    type: Number,
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
});

usersSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
var user = (module.exports = mongoose.model("users", usersSchema));
// usersSchema.pre("save", function (next) {
//   var doc = this;
//   user.findByIdAndUpdate(
//     { _id: "entityId" },
//     { $inc: { seq: 1 } },
//     function (error, user) {
//       if (error) return next(error);
//       this.id = user.seq;
//       next();
//     }
//   );
// });
