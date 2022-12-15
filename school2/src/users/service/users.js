const bcrypt = require("bcrypt");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const users = require("../model/users");

exports.getAll = () => {
  return users.find();
};

exports.register = (datas) => {
  const {
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
    Status,
  } = datas;

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
exports.generateCsvReportForAllUser = async () => {
  const csvWriter = createCsvWriter({
    // path: "src/users/csvreport/allusers.csv",
    path: "school2/csv/allUsers.csv",
    header: [
      { id: "_id", title: "ID\t\t\t\t\t\t" },
      { id: "firstName", title: "FirstName\t\t" },
      { id: "lastName", title: "LastName\t\t" },
      { id: "phone", title: "Phone\t\t" },
      { id: "phoneCode", title: "PhoneCode\t\t" },
      { id: "email", title: "Email\t\t" },
      { id: "gender", title: "Gender\t\t" },
      { id: "dob", title: "Date Of Birth\t\t" },
      { id: "role", title: "Role\t\t" },
      { id: "address1", title: "Address1\t\t" },
      { id: "address2", title: "Address2\t\t" },
      { id: "city", title: "City\t\t" },
      { id: "state", title: "State\t\t" },
      { id: "pincode", title: "PinCode\t\t" },
      { id: "status", title: "Status\t\t" },
      { id: "createDate", title: "CreatedDate\t\t" },
    ],
  });

  await csvWriter
    .writeRecords(await users.find())
    .then(() => {
      console.log("...Done");
      return "Generated";
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
