const mongoose = require("mongoose");
const moment = require("moment-timezone");

const usersSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    firstName: {
      type: String,
      unique: true,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    phoneCode: {
      type: Number,
      default: 91,
    },
    email: {
      type: String,

      unique: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    createDate: {
      type: String,
      default: moment().format("YYYY-MM-DD hh:mm"),
    },
    role: {
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
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);
usersSchema.index({id:1})
// usersSchema.plugin(AutoIncrement, { id: "user",startAt: 50, inc_field: "id" });
// usersSchema.pre("save", () => {
//   new Promise((resolve, reject) => {
//     const id = new mongoose.Types.ObjectId();
//     console.log(id);
//   });
// })

// function name() {
//  return new Promise((resolve, reject) => {
//     const id =mongoose.Types.ObjectId();
//     resolve(id)
//   });
// }
// name().then(data=>console.log(data))
module.exports = mongoose.model("users", usersSchema);
