// import mongoose, { Schema, model } from "mongoose";
// import moment from "moment-timezone";

// interface IUser {
//   id: Number;
//   firstName: string;
//   lastName: string;
//   phone: Number;
//   phoneCode: Number;
//   email: string;
//   password: string;
//   gender: string;
//   dob: string;
//   createDate: string;
//   role: string;
//   address1: string;
//   address2: string;
//   city: string;
//   state: string;
//   status: string;
//   pincode: Number;
// }
// // 2. Create a Schema corresponding to the document interface.
// const userSchema = new Schema<IUser>(
//   {
//     id: {
//       unique: true,
//     },
//     firstName: {
      
//       unique: true,
//     },
//     lastName: {
      
//     },
//     phone: {
      
//     },
//     phoneCode: {
//       default: 91,
//     },
//     email: {
      
//       unique: true,
//     },
//     password: {
      
//     },
//     gender: {
      
//     },
//     dob: {
      
//     },
//     createDate: {
//       default: moment().format("YYYY-MM-DD hh:mm"),
//     },
//     role: {
      
//     },
//     address1: {
      
//     },
//     address2: {
      
//     },
//     city: {
      
//     },
//     state: {
      
//     },
//     pincode: {
      
//     },
//     status: {
      
//     },
//   },
//   {
//     versionKey: false,
//   }
// );
// var AutoIncrement: any = Inc(userSchema);
// userSchema.plugin(AutoIncrement, { id: "users", inc_field: "id" });
// // export default model<IUser>("users", userSchema);
