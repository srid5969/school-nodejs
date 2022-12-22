const classes = require("../model/classes");
const users = require("../../users/model/users");
// exports.registerClassDemo = async (res) => {
//   console.log("classTeacher");
//   const deatail = await users.findOne({ _id: "638b597b178fd923bba41b7f" });
//   const data = await new classes({
//     name: "Demo1",
//     classTeacher:deatail,
//   });
//  return data.save();
// };
exports.assignTeacher = async (Data) => {
  const teacherData = await users.findOne({ _id: Data.classTeacherId });
  const data = await new classes({
    classTeacher:Data.classTeacherId,
    name:Data.name
  })
  return await (await data.save()).populate('classTeacher');
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
