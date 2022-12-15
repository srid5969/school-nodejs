const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const momentTime = require("moment-timezone");
const moment = momentTime().format("YYYY-MM-DD hh:mm");
const users = require("../../users/model/users");
const teachersAttendance = require("../../TeacherAttendance/model/teachersAttendance");
const yesterday = momentTime().subtract(1, "days").format("YYYY-MM-DD hh:mm");

exports.generateCsvReportForAllUser = async () => {
  const csvWriter = createCsvWriter({
    path: "school2/csv/allUsers.csv",
    header: [
      { id: "_id", title: "ID" },
      { id: "firstName", title: "FirstName" },
      { id: "lastName", title: "LastName" },
      { id: "phone", title: "Phone" },
      { id: "phoneCode", title: "PhoneCode" },
      { id: "email", title: "Email" },
      { id: "gender", title: "Gender" },
      { id: "dob", title: "Date Of Birth" },
      { id: "role", title: "Role" },
      { id: "address1", title: "Address1" },
      { id: "address2", title: "Address2" },
      { id: "city", title: "City" },
      { id: "state", title: "State" },
      { id: "pincode", title: "PinCode" },
      { id: "status", title: "Status" },
      { id: "createDate", title: "CreatedDate" },
    ],
  });

  await csvWriter
    .writeRecords(await users.find())
    .then(() => {
      console.log("...Done");
      return "Generated";
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
exports.generateListOfTeachers = async (req, res) => {
  const csvWriter = createCsvWriter({
    path: "school2/csv/generateListOfTeachers.csv",
    header: [
      { id: "firstName", title: "FirstName" },
      { id: "lastName", title: "LastName" },
      { id: "status", title: "Status" },
      { id: "city", title: "City" },
      { id: "state", title: "State" },
    ],
  });
  csvWriter
    .writeRecords(
      await users
        .find({ role: "Teacher" })
        .select(" firstName lastName status city state")
    )
    .then(() => {
      console.log("...Done");
      res.json({ message: "Generated Report" });
    });
};
exports.generate_a_Report_For_Particular_Teacher = async (data) => {
  let record = [];
  record[0] = await users.findOne({
    role: "Teacher",
    _id: data,
  });
  console.log(record);
  const location = "school2/csv/Report_of_" + data + ".csv";
  const csvWriter = createCsvWriter({
    path: location,
    header: [
      { id: "_id", title: "ID" },
      { id: "firstName", title: "FirstName" },
      { id: "lastName", title: "LastName" },
      { id: "phone", title: "Phone" },
      { id: "phoneCode", title: "PhoneCode" },
      { id: "email", title: "Email" },
      { id: "gender", title: "Gender" },
      { id: "dob", title: "Date Of Birth" },
      { id: "role", title: "Role" },
      { id: "address1", title: "Address1" },
      { id: "address2", title: "Address2" },
      { id: "city", title: "City" },
      { id: "state", title: "State" },
      { id: "pincode", title: "PinCode" },
      { id: "status", title: "Status" },
      { id: "createDate", title: "CreatedDate" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    console.log("...Done");
    return { message: "Generated Report" };
  });
};
exports.generate_a_Report_For_Particular_Teacher_attendance_for_yesterday =
  async (teacher) => {
    let record = [];
    record[0] = await (
      await teachersAttendance.find({ _id: teacher })
    ).filter((data) => {
      if (data.createDate.substring(0, 10) == yesterday.substring(0, 10)) {
        return data;
      }
    });
    const location =
      "school2/csv/_Report_For_" + teacher + "__for_yesterday.csv";
    const csvWriter = createCsvWriter({
      path: location,
      header: [
        { id: "firstName", title: "FirstName" },
        { id: "lastName", title: "LastName" },
        { id: "status", title: "Status" },
        { id: "city", title: "City" },
        { id: "state", title: "State" },
      ],
    });
    csvWriter.writeRecords(record).then(() => {
      console.log("...Done");
      return ({ message: "Generated Report" });
    });
  };
