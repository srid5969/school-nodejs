const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const momentTime = require("moment-timezone")();
const students = require("../../students/model/students");
const moment = momentTime.format("YYYY-MM-DD hh:mm");
const users = require("../../users/model/users");
const teachersAttendance = require("../../TeacherAttendance/model/teachersAttendance");
const studentsAttendance = require("../../studentsAttendance/model/studentsAttendance");
const yesterday = momentTime.subtract(1, "days").format("YYYY-MM-DD hh:mm");

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
};//1
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
};//2
exports.generate_a_Report_For_Particular_Teacher = async (data) => {
  const record = await users.find({
    role: "Teacher",
    _id: data,
  });
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
};//3
exports.generate_a_Report_For_Particular_Teacher_attendance_for_yesterday =async (teacher) => {
    let record = [];
    record[0] = await (
      await teachersAttendance.find({ userId: teacher })
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
      return { message: "Generated Report" };
    });
  };//4
exports.get_monthly_report_for_a_teacher = async (teacher, month) => {
  const record = await (
    await teachersAttendance.find({ userId: teacher })
  ).filter((data) => {
    if (data.createDate.substring(5, 7) == month) return data;
  });
  const location =
    "school2/csv/_Report_For_" + teacher + "__for_" + month + ".csv";
  const csvWriter = createCsvWriter({
    path: location,
    header: [
      { id: "_userId", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    console.log("...Done");
  });
};//5
exports.get_monthly_report_for_a_teacher = async (teacher, year) => {
  const record = await (
    await teachersAttendance.find({ userId: teacher })
  ).filter((data) => {
    if (data.createDate.substring(0, 4) == year) return data;
  });
  const location =
    "school2/csv/_Report_For_" + teacher + "__for_year" + year + ".csv";
  const csvWriter = createCsvWriter({
    path: location,
    header: [
      { id: "_userId", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    console.log("...Done");
  });
};//6
exports.get_monthly_report_for_a_student = async (studentiid, month) => {
  const record = await (
    await studentsAttendance.find({ studentId: studentiid })
  ).filter((data) => {
    if (data.createDate.substring(5, 7) == month) return data;
  });
  const location =
    "school2/csv/_Report_For_" + studentiid + "__for_year" + month + ".csv";
  const csvWriter = createCsvWriter({
    path: location,
    header: [
      { id: "studentId", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    console.log("...Done");
  });
};//7
exports.get_yearly_report_for_a_student = async (studentId, year) => {
  const record = await (
    await studentsAttendance.find({ studentId })
  ).filter((data) => {
    if (data.createDate.substring(0, 4) == year) return data;
  });
  const location =
    "school2/csv/_Report_For_" + studentId + "__for_year" + year + ".csv";
  const csvWriter = createCsvWriter({
    path: location,
    header: [
      { id: "studentId", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    console.log("...Done");
  });
};//8
exports.generateListOfStudents = async () => {
  const csvWriter = createCsvWriter({
    path: "school2/csv/generateListOfStudents.csv",
    header: [
      { id: "firstName", title: "FirstName" },
      { id: "classid", title: "classid" },
      { id: "dob", title: "dob" },
      { id: "city", title: "City" },
      { id: "createDate", title: "createDate" },
    ],
  });
  csvWriter.writeRecords(await students.find()).then(() => {
    console.log("...Done");
  });
};//9
