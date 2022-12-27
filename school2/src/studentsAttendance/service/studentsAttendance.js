const moment = require("moment-timezone");

const students = require("../model/studentsAttendance");
const tita = (exports.getAll = async () => {
  return await students
    .find()
    .populate("student")
    .populate("class")
    .sort({ createDate: -1 });
});
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
exports.updateOrInsertBulkStudentsAttendance = async (bulkAttendance) => {
  try {
    // console.log(await students.find({date:{ $lt:moment().format("YYYY-MM-DD")}}));
    if (await students.findOne({ date: moment().format("YYYY-MM-DD") })) {
      const t = await students.deleteMany({
        date: moment().format("YYYY-MM-DD"),
      });
      console.log("=======hjdfhgjdfhjfghnj=========");
    }
    const data = await students.insertMany(bulkAttendance);

    return await data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
exports.getClassAttendanceByClassId = async (classId) => {
  return await students.find({ class: classId });
};
exports.getClassStudentsAttendanceByDate = async (date) => {};
