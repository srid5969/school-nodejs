const bcrypt = require("bcrypt");
const users = require("../model/users");

exports.getAll = () => {
  // return users.find({},{ projection: { _id: 0 } })
  return users
    .find()
    .select(" email firstName lastName phone phoneCode gender status");
};

exports.register = (datas) => {
  const {
    firstName,
    lastName,
    phone,
    phoneCode,
    email,
    password,
    gender,
    dob,
    role,
    address1,
    address2,
    city,
    state,
    pincode,
    status,
  } = datas;
  const data = new users({
    firstName,
    lastName,
    phone,
    phoneCode,
    email,
    password,
    gender,
    dob,
    role,
    address1,
    address2,
    city,
    state,
    pincode,
    status,
  });

  return data.save();
};
exports.userlogin = function (data) {
  return data;
};
exports.update = async (datas, user) => {
  const {
    firstName,
    lastName,
    phone,
    phoneCode,
    email,
    password,
    gender,
    dob,
    address1,
    address2,
    city,
    state,
    pincode,
    status,
  } = datas;

  return await data.updateOne(
    { _id: user },
    {
      firstName,
      lastName,
      phone,
      phoneCode,
      email,
      password,
      gender,
      dob,
      address1,
      address2,
      city,
      state,
      pincode,
      status,
    }
  );
};
exports.deleteByEmail = async (user) => {
  const data = await users.deleteOne({ email: user });
  return data;
};
