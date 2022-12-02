const bcrypt = require("bcrypt");

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
exports.login = async (username, password) => {
  const data = (
    await users.aggregate([
      ({
        $match: {
          email: username,
        },
      },
      {
        $group: {
          _id: "$password",
        },
      }),
    ])
  ).pop()._id;

  if (data) {
    const Data = await bcrypt.compare(password, data);
    if (Data) {
      return "Welcome ";
    } else {
      return "Wrong password please check the password";
    }
  }
};