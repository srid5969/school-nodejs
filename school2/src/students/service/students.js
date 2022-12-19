const students = require("../model/students");
const classes = require("../../classes/model/classes");

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
 datas.classid=await classes.findOne({name:datas.classid})
  const data = new students(datas);
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
