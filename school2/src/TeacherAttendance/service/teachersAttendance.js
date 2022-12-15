const momentTimezone = require("moment-timezone");

const teachers = require("../model/teachersAttendance");

exports.getAll = () => {
  return teachers.find();
};

exports.register = ({ userId, status, date}) => {
  const data = new teachers({
    userId,
    status,
    date,
  });
  return data.save()
};
exports.deleteTeachersById = async (payload) => {
  const data = await teachers.findByIdAndDelete(payload);
};
exports.findTeachersById = async (payload) => {
  const data = await teachers.findById(payload);
};
exports.updateTeachersById = async (id, payload) => {
  const { UserId, Status, Dates, CreateDate } = payload;
  const data = await teachers.findOneAndUpdate(
    { _id: payload },
    { userId: UserId, status: Status, date: Dates, createDate: CreateDate }
  );
};
