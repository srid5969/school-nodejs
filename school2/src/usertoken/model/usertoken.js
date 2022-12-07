const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  users: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
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
    const data = Array(N + 1)
      .join((Math.random().toString(36) + "8782").slice(2, 18))
      .slice(0, N);
    this.token = await data;
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
