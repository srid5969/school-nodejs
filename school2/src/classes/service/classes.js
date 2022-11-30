const classes = require("../model/classes");

exports.save = async (Name, ClassTeacher) => {
  const data = new classes({
    name: Name,
    classTeacher: ClassTeacher,
  });

  return data.save();
};
