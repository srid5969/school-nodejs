const students = require("../model/studentsAttendance");

exports.getAll = () => {
  return students.find();
};

exports.register = (ClassId, StudentId, Status, Dates) => {
  const data = new students({
    classid: ClassId,
    studentId: StudentId,
    status: Status,
    dates: Dates,
    createDate: CreateDate,
  })
  return data.save()
};
exports.deleteStudentsAttendance = async (payload) => {
  const data = students.deleteOne({ studentId: payload });
  return data;
};
exports.updateStudentsAttendance = async (stuId, Status) => {
  const data = students.findByIdAndUpdate({ studentId: stuId }, { status: Status });
  return data;
};
exports.findStudentsAttendanceByStudentId = async (payload) => {
  const data = students.findOne({ studentId: payload });
  return data;
};
