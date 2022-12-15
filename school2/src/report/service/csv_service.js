const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const users = require("../../users/model/users");


exports.generateCsvReportForAllUser = async () => {
    const csvWriter = createCsvWriter({
      // path: "src/users/csvreport/allusers.csv",
      path: "school2/csv/allUsers.csv",
      header: [
        { id: "_id", title: "ID\t\t\t\t\t\t" },
        { id: "firstName", title: "FirstName\t\t" },
        { id: "lastName", title: "LastName\t\t" },
        { id: "phone", title: "Phone\t\t" },
        { id: "phoneCode", title: "PhoneCode\t\t" },
        { id: "email", title: "Email\t\t" },
        { id: "gender", title: "Gender\t\t" },
        { id: "dob", title: "Date Of Birth\t\t" },
        { id: "role", title: "Role\t\t" },
        { id: "address1", title: "Address1\t\t" },
        { id: "address2", title: "Address2\t\t" },
        { id: "city", title: "City\t\t" },
        { id: "state", title: "State\t\t" },
        { id: "pincode", title: "PinCode\t\t" },
        { id: "status", title: "Status\t\t" },
        { id: "createDate", title: "CreatedDate\t\t" },
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
    csvWriter.writeRecords(await users.find({ role: "Teacher" })).then(() => {
      console.log("...Done");
      res.json({ message: "Generated Report" });
    });
  };
  exports.generate_a_Report_For_Particular_Teacher=async(data)=>{
   const location= "school2/csv/Report_of_"+data+".csv";
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
    csvWriter.writeRecords(await users.find({ role: "Teacher", })).then(() => {
      console.log("...Done");
      res.json({ message: "Generated Report" });
    });
  }
  