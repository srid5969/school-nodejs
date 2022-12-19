const students = require("../model/studentsAttendance");
exports.getAll = () => {
  return students.find();
};
exports.register = async(Data) => {
  const data = new students(Data);
  return await data.save()
};
exports.deleteStudentsAttendance = async (studentId) => {
  const data = students.deleteOne(studentId);
  return data;
};
exports.updateStudentsAttendance = async (studentId, status) => {
  const data = students.findByIdAndUpdate(studentId,status);
  return data;
};
exports.findStudentsAttendanceByStudentId = async (studentId) => {
  const data = students.findOne(studentId);
  return data;
};
