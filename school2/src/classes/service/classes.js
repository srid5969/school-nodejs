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

exports.registerClass = async (Name, user) => {
  console.log(user);
  const data = await new classes({
    name: Name,
    classTeacher: user,
  });
  console.log("classTeacher");
  // return data.save();
  return data.save();
};
exports.getAll = async () => {
  const data = classes.find().populate({ path: "classTeacher" });
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
  return "Successfully deleted";
};
exports.updateClassTeacherByClassName = async (payload,user) => {
  const data = classes.updateOne(
    { name: payload },
    { classTeacher: user }
  );
  return data;
};
