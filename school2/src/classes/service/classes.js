const classes = require("../model/classes");
const users = require("../../users/model/users");

exports.assignTeacher = async (Data) => {
  Data.classTeacher = await await users.findOne(
    { firstName: Data.classTeacher },
    { _id: 1 }
  );
  const data = await new classes(Data);
  return await (await data.save()).populate("classTeacher");
};
exports.registerClass = async (name, classTeacher) => {
  const data = await new classes({
    name,
    classTeacher,
  });

  return data.save();
};
exports.getAll = async (condition, classTeacher) => {
  if (condition == "Teacher") {
    const Data = await (
      await classes.find({ classTeacher }).populate({ path: "classTeacher" })
    ).map(
      (data) =>
        (data = {
          _id: data._id,
          classTeacher:
            data.classTeacher.firstName + " " + data.classTeacher.lastName,
          name: data.name,
          classId: data.classTeacher._id,
        })
    );
    return Data;
  } else {
    const Data = await (
      await classes.find().populate({ path: "classTeacher" })
    ).map(
      (data) =>
        (data = {
          _id: data._id,
          classTeacher:
            data.classTeacher.firstName + " " + data.classTeacher.lastName,
          name: data.name,
          classId: data.classTeacher._id,
        })
    );
    return Data;
  }
};
exports.getByClassId = async (_id) => {
  const data = classes
    .findOne(_id)
    .populate({ path: "classTeacher", model: users });
  return data;
};
exports.deleteByClassId = async (_id) => {
  const data = await classes.findByIdAndDelete(_id);
  return data;
};
exports.updateClassTeacherByClassId = async (_id, user) => {
  const data = await classes.updateOne(_id, { classTeacher: user });
  return await classes.findOne(_id).populate({ path: "classTeacher" });
};
