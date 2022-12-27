const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const momentTime = require("moment-timezone")();
const students = require("../../students/model/students");
const trigger = require("../../../common/events/trigger");
const commonLocation = "school2/csv/";
const moment = momentTime.format("YYYY-MM-DD hh:mm");
const users = require("../../users/model/users");
const teachersAttendance = require("../../TeacherAttendance/model/teachersAttendance");
const studentsAttendance = require("../../studentsAttendance/model/studentsAttendance");
const yesterday = momentTime.subtract(1, "days").format("YYYY-MM-DD");
const commonLink = "http://192.168.0.123:8080/download/";
exports.generateCsvReportForAllUser = async (email) => {
  const fileName = "allUsers.csv";
  const csvWriter = createCsvWriter({
    path: commonLocation + fileName,
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
      trigger.emit("emailAllUser", email, commonLink + fileName);
      console.log("...Done");
      return "Generated";
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}; //1
exports.generateListOfTeachers = async (res, email) => {
  const fileName = "generateListOfTeachers.csv";
  const csvWriter = createCsvWriter({
    path: commonLocation + fileName,
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
      trigger.emit("emailAllUser", email, commonLink + fileName);
      res.json({ message: "Generated Report" });
    });
}; //2
exports.generate_a_Report_For_Particular_Teacher = async (data, email) => {
  const record = await users.find({
    role: "Teacher",
    _id: data,
  });
  const fileName = "Report_of_" + data + ".csv";
  const csvWriter = createCsvWriter({
    path: location + fileName,
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
    trigger.emit("emailAllUser", email, commonLink + fileName);
    return { message: "Generated Report" };
  });
}; //3
exports.generate_a_Report_For_Particular_Teacher_attendance_for_yesterday =
  async (teacher, email) => {
    const record = await (
      await teachersAttendance.find({ userId: teacher })
    ).filter((data) => {
      if (data.createDate.substring(0, 10) == yesterday) {
        return data;
      }
    });
    const fileName = "_Report_For_" + teacher + "__for_yesterday.csv";
    const csvWriter = createCsvWriter({
      path: commonLocation + fileName,
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
      trigger.emit("emailAllUser", email, commonLink + fileName);

      return { message: "Generated Report" };
    });
  }; //4
exports.get_monthly_report_for_a_teacher = async (teacher, month, email) => {
  const record = await (
    await teachersAttendance.find({ userId: teacher })
  ).filter((data) => {
    if (data.createDate.substring(5, 7) == month) return data;
  });
  const fileName = "_Report_For_" + teacher + "__for_" + month + ".csv";
  const csvWriter = createCsvWriter({
    path: commonLocation + fileName,
    header: [
      { id: "_userId", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    trigger.emit("emailAllUser", email, commonLink + fileName);

    console.log("...Done");
  });
}; //5
exports.get_monthly_report_for_a_teacher = async (teacher, year) => {
  const record = await (
    await teachersAttendance.find({ userId: teacher })
  ).filter((data) => {
    if (data.createDate.substring(0, 4) == year) return data;
  });
  const fileName = "_Report_For_" + teacher + "__for_year" + year + ".csv";
  const csvWriter = createCsvWriter({
    path: commonLocation + fileName,
    header: [
      { id: "_userId", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    trigger.emit("emailAllUser", email, commonLink + fileName);
    console.log("...Done");
  });
}; //6
exports.get_monthly_report_for_a_student = async (studentId, month, email) => {
  const record = await (
    await studentsAttendance.find({ studentId: studentId })
  ).filter((data) => {
    if (data.createDate.substring(5, 7) == month) return data;
  });
  const fileName = "_Report_For_" + studentId + "__for_year" + month + ".csv";
  const csvWriter = createCsvWriter({
    path: commonLocation + fileName,
    header: [
      { id: "studentId", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    trigger.emit("emailAllUser", email, commonLink + fileName);

    console.log("...Done");
  });
}; //7
exports.get_yearly_report_for_a_student = async (studentId, year, email) => {
  const record = await (
    await studentsAttendance.find({ studentId })
  ).filter((data) => {
    if (data.createDate.substring(0, 4) == year) return data;
  });
  const fileName = "_Report_For_" + studentId + "__for_year" + year + ".csv";
  const csvWriter = createCsvWriter({
    path: commonLocation,
    header: [
      { id: "student", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    trigger.emit("emailAllUser", email, commonLink + fileName);

    console.log("...Done");
  });
}; //8
exports.generateListOfStudents = async () => {
  const fileName = "generateListOfStudents.csv";
  const csvWriter = createCsvWriter({
    path: commonLocation + fileName,
    header: [
      { id: "firstName", title: "FirstName" },
      { id: "classid", title: "classid" },
      { id: "dob", title: "dob" },
      { id: "city", title: "City" },
      { id: "createDate", title: "createDate" },
    ],
  });
  csvWriter.writeRecords(await students.find()).then(() => {
    trigger.emit("emailAllUser", email, commonLink + fileName);
    console.log("...Done");
  });
}; //9
//============================================================================================================================================================
exports.getInfoByGettingFromToDateForStudentsByClassId = async (
  from = "1000-12-23",
  to = "2025-12-24",
  classId
) => {
  const document = await studentsAttendance.find({
    date: {
      $gt: from,
      $lt: to,
    },
    classId,
  });
  const fileName =
    "_Report_For_getInfoByGettingFrom" +
    from +
    "To" +
    to +
    "ForStudentsByClass" +
    classId +
    ".csv";

  const csvWriter = createCsvWriter({
    path: commonLocation,
    header: [
      { id: "studentId", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "date", title: "Date" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    trigger.emit("emailAllUser", email, commonLink + fileName);

    console.log("...Done");
  });
  return document;
};
exports.getInfoByGettingFromToDateForTeachers = async (
  from = "1000-12-23",
  to = "2025-12-24"
) => {
  const document = await teachersAttendance.find({
    date: {
      $gt: from,
      $lt: to,
    },
  });
  const fileName =
    "_Report_For_getInfoByGettingFrom" +
    from +
    "To" +
    to +
    "ForTeachers" +
    ".csv";
  const csvWriter = createCsvWriter({
    path: commonLocation,
    header: [
      { id: "studentId", title: "ID" },
      { id: "createDate", title: "At" },
      { id: "status", title: "Status" },
    ],
  });
  csvWriter.writeRecords(record).then(() => {
    trigger.emit("emailAllUser", email, commonLink + fileName);

    console.log("...Done");
  });
  return document;
};
