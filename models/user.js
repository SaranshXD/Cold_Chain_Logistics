import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // No hashing applied
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "contractor", "customer"],
    default: "customer",
  },
  resetToken: String,
  tokenExpiry: Date
});

const User = mongoose.model("userData", UserSchema);
export default User;


//dqwqwd

// import mongoose from "mongoose";

// const User = new mongoose.Schema(
//     {
//         name :{
//             type: String ,
//             required : true
//          },
//         email :{
//             type: String,
//             required : true,
//             unique : true
//          },
//          password :{
//             type: String ,
//             required : true
//          },
//         quote: { 
//             type: String 
//         },
//     },
// )

// const model = mongoose.model('userData',User)
// export default model;