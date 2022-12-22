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
exports.register = async (datas) => {
  datas.classid = await classes.findOne({ _id: datas.classid });
  const data = new students(datas);
  return await data.save();
};
exports.updateStudentDetailsById = async (_id, datas) => {
  const data = await students.updateOne(_id, datas);
  return data;
};
exports.deleteStudentById = async (id) => {
  const data = students.deleteOne({ _id: id });
  return data;
};
exports.findStudentById = async (_id) => {
  const data = await students.findById(_id);
  return await data;
};
exports.getStudentsListByClassId = async (classid) => {
  const data = await students
    .find(
      { classid: classid },
      {  createDate: 0, mothername: 0, pincode: 0, address2: 0 }
    )
    .sort({ firstName: 1 });
  return await data;
};
