// const bcrypt = require("bcrypt");
const users = require("../model/users");

exports.getAll = () => {
  // return users.find({},{ projection: { _id: 0 } })
  return users.find().sort({ createDate: 1 })
  //.select(" email firstName lastName phone phoneCode gender status");
};
exports.getById = async (_id) => {
  const data = await users
    .findById(_id)
    .select(
      " _id email password phone phoneCode gender dob role address1 address2 city state pincode status firstName lastName"
    );
  data.password = "password";

  return data;
};
exports.register = (datas) => {
  const data = new users(datas);
  return data.save();
};
exports.userlogin = function (data) {
  return data;
};
exports.updateById = async (_id,data) => {
  return await users.findByIdAndUpdate(_id, data);
   
};
exports.deleteByEmail = async (user) => {
  const data = await users.deleteOne({ _id: user });
  return data;
};
exports.getByRole=async(data)=>{
  return await users.find({role:data})
}