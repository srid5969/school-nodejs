const students = require("../model/studentsAttendance");

exports.getAll = async () => {
  return await students
    .find()
    .populate("studentId")
    .populate("classId")
    .sort({ createDate: -1 });
};
exports.register = async (Data) => {
  const data = new students(Data);
  return await data.save();
};
exports.deleteStudentsAttendance = async (studentId) => {
  const data = students.deleteOne(studentId);
  return data;
};
exports.updateStudentsAttendance = async (studentId, status) => {
  const data = students.findByIdAndUpdate(studentId, status);
  return data;
};
exports.findStudentsAttendanceByStudentId = async (studentId) => {
  const data = students.findOne(studentId);
  return data;
};
exports.updateOrInsertBulkStudentsAttendance = async ( bulkAttendance) => {
  await students.deleteMany({ date:moment().format("YYYY-MM-DD") });
  const data = await students.insertMany(bulkAttendance);
  return await data
};
exports.getClassAttendanceByClassId=async(classId)=>{
return await students.find({classId})
}
exports.getClassStudentsAttendaceByDate=async(date)=>{
  
}