const EventEmitter = require("events");
const Mongoose = require("mongoose");


var eventEmitter = new EventEmitter();
const users = require("../../src/users/model/users");
const classes = require("../../src/classes/model/classes");
const students = require("../../src/students/model/students");
const studentsAttendance = require("../../src/studentsAttendance/model/studentsAttendance");
const teachersAttendance = require("../../src/TeacherAttendance/model/teachersAttendance");

eventEmitter.on("generateId", async () => {
  await setTimeout(async () => {
    console.log("=============Id generation started========================");
    var result = await users.find({});
    for (var i = 0; i < result.length; i++) {
      await users.updateOne(
        { _id: result[i]._id },
        { id: Mongoose.Types.ObjectId() },
        { upsert: true ,new: true  }
      );
    }

    var result2 = await classes.find({});
    for (var i = 0; i < result2.length; i++) {
      await classes.updateOne(
        { _id: result2[i]._id },
        { id: Mongoose.Types.ObjectId() },
        { upsert: true  ,new: true }
      );
    }
    var result4 = await students.find({});
    for (var i = 0; i < result4.length; i++) {
      await students.updateOne(
        { _id: result4[i]._id },
        { id: Mongoose.Types.ObjectId() },
        { upsert: true ,new: true  }
      );
    }

    var result5 = await studentsAttendance.find({});
    for (var i = 0; i < result5.length; i++) {
      await studentsAttendance.updateOne(
        { _id: result5[i]._id },
        { id: Mongoose.Types.ObjectId() },
        { upsert: true  ,new: true }
      );
    }

    var result6 = await teachersAttendance.find({});
    for (var i = 0; i < result6.length; i++) {
      await teachersAttendance.updateOne(
        { _id: result6[i]._id },
        { id: Mongoose.Types.ObjectId() },
        { upsert: true  ,new: true }
      );
    }
    console.log("=============Id generation completed========================");
  }, 5000);
});
module.exports = eventEmitter;
