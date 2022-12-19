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
  const teacherData = await users.findOne(Data.teacher);
  console.log(teacherData)
  const data = await classes.create({
    classTeacher: teacherData,
    name: Data.name,
  });
  return await data;
};
exports.registerClass = async (name, classTeacher) => {

  const data = await new classes({
    name,
    classTeacher,
  });

  return data.save();
};
exports.getAll = async () => {
  const data = classes.find().populate({ path: "classTeacher" });
  return data;
};
exports.getByClassName = async (payload) => {
  const data = classes
    .findOne({ name: payload })
    .populate({ path: "classTeacher", model: users });
  return data;
};
exports.deleteByClassName = async (payload) => {
  const data =await classes.deleteOne({ name: payload });
  return data;
};
exports.updateClassTeacherByClassName = async (payload, user) => {
  const data = await classes.updateOne(
    { name: payload },
    { classTeacher: user }
  );
  return await classes
    .findOne({ name: payload })
    .populate({ path: "classTeacher" });
};
