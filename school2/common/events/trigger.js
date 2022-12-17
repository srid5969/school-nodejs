const EventEmitter = require("events");
const email = require("./email");

var eventEmitter = new EventEmitter();

eventEmitter.on("emailAllUser", (async (emailid='sridhar@innovixtech.com', link) => {
  email.sendMail(emailid, link);
}))
module.exports = eventEmitter;
