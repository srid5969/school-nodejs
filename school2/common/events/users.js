const EventEmitter = require("events");
var eventEmitter = new EventEmitter();
const users = require("../../src/users/model/users");

eventEmitter.on("inactive", async (params) => {
  //event to set user inactive
  const data = await users.findByIdAndUpdate(
    { _id: params },
    { status: "Inactive" }
  );
});
eventEmitter.on("active", async (params) => {
  const data = await users.findByIdAndUpdate(
    { _id: params },
    { status: "Active" }
  );
});
module.exports = eventEmitter;
