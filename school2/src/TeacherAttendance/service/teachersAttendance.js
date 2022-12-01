const students = require("../model/studentsAttendance");

exports.getAll = () => {
  return students.find();
};

exports.save = (UserId,Status,Dates,CreateDate) => {
  const data = new users({
    userId: UserId,
    status: Status,
    dates: Dates,
    createDate: CreateDate
  });
};
