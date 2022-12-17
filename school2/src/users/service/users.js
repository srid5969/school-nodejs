const bcrypt = require("bcrypt");
const users = require("../model/users");

exports.getAll = () => {
  // return users.find({},{ projection: { _id: 0 } })
  return users.find().select(" _id firstName lastName phone phoneCode gender role address1 address2 city state pincode status");
};

exports.register = (datas) => {
  
const { firstName,
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
  status}=datas
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
    status
  });

  return data.save();
};
exports.userlogin = function (data) {
  return data;
};
exports.update = async (datas, user) => {
  const {
    FirstName,
    LastName,
    Phone,
    PhoneCode,
    Gender,
    DOB,
    Role,
    Address1,
    Address2,
    City,
    State,
    Pincode,
    Status,
  } = datas;

  const data = await new users({
    firstName: FirstName,
    lastName: LastName,
    phone: Phone,
    phoneCode: PhoneCode,
    email: Email,
    password: Password,
    gender: Gender,
    dob: DOB,
    role: Role,
    address1: Address1,
    address2: Address2,
    city: City,
    state: State,
    pincode: Pincode,
    status: Status,
  });
  return data.updateOne();
};
exports.deleteByEmail = async (user) => {
  const data = await users.deleteOne({ email: user });
  return data;
};