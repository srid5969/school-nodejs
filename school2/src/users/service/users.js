const users = require("../model/users");

exports.getAll = () => {
  return users.find();
};

exports.save = (
  FirstName,
  LastName,
  Phone,
  PhoneCode,
  Email,
  Password,
  Gender,
  DOB,
  Role,
  Address1,
  Address2,
  City,
  State,
  Pincode,
  Status
) => {
  const data = new users({
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

  return data.save();
};
exports.login=async(username,password)=>{
  

}