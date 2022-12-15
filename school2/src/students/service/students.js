const students = require("../model/students");

exports.getAll = () => {
  return students.find();
};

exports.findStudentByfirstName = () => {
  const { FirstName } = datas;
  const data = new students({
    firstName: FirstName,
  });
  return data.find();
};

exports.register =async (datas) => {
  const {
    firstName,
    lastName,
    classid,
    dob,
    fathername,
    mothername,
    address2,
    address1,
    city,
    pincode,
  } = datas;
  const data = new students({
    firstName,
    lastName,
    classid,
    dob,
    fathername,
    mothername,
    address2,
    address1,
    city,
    pincode,
  });
  return await data.save();
};
exports.updateStudentDetailsById = async (id, datas) => {
  const {
    firstName,
    lastName,
    dob,
    fathername,
    mothername,
    address2,
    address1,
    city,
    pincode,
    classid,
  } = datas;
  const data =await students.updateOne(
    { _id: id },
    {
      firstName,
      lastName,
      dob,
      fathername,
      mothername,
      address2,
      address1,
      city,
      pincode,
      classid,
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
