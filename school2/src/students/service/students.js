const students = require("../model/students");
const classes = require("../../classes/model/classes");
exports.getAll = () => {
  return students.find();
};
exports.findStudentByfirstName = (data) => {
  const { firstName } = data;
  return students.findOne({ firstName });
};
exports.register = async (datas, _id) => {
  console.log(datas);
  datas.classid = await classes.findOne({ _id });
  const data = new students(datas);
  return await data.save();
};
exports.updateStudentDetailsById = async (_id, datas) => {
  const data = await students.updateOne(_id, datas);
  return data;
};
exports.deleteStudentById = async (_id) => {
  const data = students.deleteOne({ _id });
  return data;
};
exports.findStudentById = async (_id) => {
  const data = await students.findOne({ _id });
  return await data;
};
exports.getStudentsListByClassId = async (classid) => {
  const data = await students.find({ classid: classid }).sort({ firstName: 1 });
  return await data;
};
