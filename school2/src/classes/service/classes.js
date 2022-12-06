const classes = require("../model/classes");
const users = require("../../users/model/users");

exports.register = async (Name, ClassTeacher) => {
  const data = new classes({
    name: Name,
    classTeacher: ClassTeacher,
  });

  return data.save();
};
exports.getAll = async () => {
  const data = classes.find().populate({ path: "classTeacher", model: users });
  return data;
};

exports.getByClassName = async (payload) => {
  const data = classes
    .find({ name: payload })
    .populate({ path: "classTeacher", model: users });
  return data;
};
exports.deleteByClassName = async (payload) => {
  const data = classes.deleteOne({ name: payload });
  return data;
};
exports.updateClassTeacherByClassName = async (payload) => {
  const data = classes.updateOne({ name: payload },{classTeacher: ClassTeacher});
  return data;
};
