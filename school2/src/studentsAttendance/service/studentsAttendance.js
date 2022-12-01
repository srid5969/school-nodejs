const students = require("../model/studentsAttendance");

exports.getAll = () => {
  return students.find();
};

exports.save = (ClassId,StudentId,Status,Dates,CreateDate) => {
  const data = new users({
    classid: ClassId,
    studentId: StudentId,
    status: Status,
    dates: Dates,
    createDate: CreateDate
  });
};
