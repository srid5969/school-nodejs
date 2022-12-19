const mongoose = require("mongoose");
const moment = require("moment-timezone");

const userSchema = new mongoose.Schema({
  users: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm"),
  },
  token: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

const userToken = mongoose.model("usertoken", userSchema);
module.exports = userToken;
userSchema.methods.generateToken = function () {
  const N = 10;
  const data = Array(N + 1)
    .join((Math.random().toString(36) + "8782").slice(2, 18))
    .slice(0, N);
  this.token = data;
};
userSchema.pre("save", async function (next) {
  try {
    const N = 10;
    const data = await Array(N + 1)
      .join((Math.random().toString(36) + "8782").slice(2, 18))
      .slice(0, N);

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data, salt);
     this.token =await hashedPassword
    } catch (error) {
      next(error);
    }
    this.status = "Active";
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.logOut = function () {
  try {
    this.status = "Inactive";
  } catch (error) {}
};
