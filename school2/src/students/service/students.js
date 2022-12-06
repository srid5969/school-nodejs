const students = require("../model/students");

exports.getAll = () => {
  return students.find();
};

exports.register = (datas) => {
  const {
    FirstName,
    LastName,
    Classid,
    Dob,
    Fathername,
    Mothername,
    Address1,
    Address2,
    City,
    State,
    Pincode,
    Createdate,
  } = datas;
  const data = new students({
    firstName: FirstName,
    lastName: LastName,
    classid: Classid,
    dob: Dob,
    fathername: Fathername,
    mothername: Mothername,
    address1: Address1,
    address2: Address2,
    city: City,
    state: State,
    pincode: Pincode,
    createdate: Createdate,
  });
};
exports.updateStudentDetailsById = async (id, datas) => {
  const {
    FirstName,
    LastName,
    Classid,
    Dob,
    Fathername,
    Mothername,
    Address1,
    Address2,
    City,
    State,
    Pincode,
  } = datas;
  const data = students.updateOne(
    { _id: id },
    {
      firstName: FirstName,
      lastName: LastName,
      classid: Classid,
      dob: Dob,
      fathername: Fathername,
      mothername: Mothername,
      address1: Address1,
      address2: Address2,
      city: City,
      state: State,
      pincode: Pincode,
      createdate: Createdate,
    }
  );
  return data;
};
exports.deleteStudentById = async (id) => {
  const data = students.deleteOne({ _id: id });
  return data;
};
exports.findStudentById = async (id) => {
  const data = students.findOne({ _id: id });
  return data;
};