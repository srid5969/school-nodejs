const EventEmitter = require("events");
var eventEmitter = new EventEmitter();
const users = require("../../src/users/model/users");
const classes = require("../../src/classes/model/classes");
const students = require("../../src/students/model/students");
const studentsAttendance = require("../../src/studentsAttendance/model/studentsAttendance");
const teachersAttendance = require("../../src/TeacherAttendance/model/teachersAttendance");

eventEmitter.on("generateId", async () => {
  console.log("=============generateId========================");

  result = await users.find({});
  for (var i = 0; i < result.length; i++) {
    await users.updateOne({ _id: result[i]._id }, { id: i }, { upsert: true });
  }

  result2 = await classes.find({});
  for (var i = 0; i < result2.length; i++) {
    await classes.updateOne(
      { _id: result2[i]._id },
      { id: i },
      { upsert: true }
    );
  }
  result4 = await students.find({});
  for (var i = 0; i < result4.length; i++) {
    await students.updateOne(
      { _id: result4[i]._id },
      { id: i },
      { upsert: true }
    );
  }

  result5 = await studentsAttendance.find({});
  for (var i = 0; i < result5.length; i++) {
    await studentsAttendance.updateOne(
      { _id: result5[i]._id },
      { id: i },
      { upsert: true }
    );
  }

  result5 = await teachersAttendance.find({});
  for (var i = 0; i < result5.length; i++) {
    await teachersAttendance.updateOne(
      { _id: result5[i]._id },
      { id: i },
      { upsert: true }
    );
  }
});
// module.exports = eventEmitter;
