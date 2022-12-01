const students = require("../model/students");

exports.getAll = () => {
  return students.find();
};

exports.save = (FirstName,LastName,Classid,Dob,Fathername,Mothername,Address1,Address2,City,State,Pincode,Createdate) => {
  const data = new users({
    firstName: FirstName,
    lastName: LastName,
    classid:Classid,
    dob: Dob,
    fathername: Fathername,
    mothername: Mothername,
    address1: Address1,
    address2: Address2,
    city: City,
    state: State,
    pincode: Pincode,
    createdate: Createdate
  });
};
