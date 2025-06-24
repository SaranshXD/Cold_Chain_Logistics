import mongoose from "mongoose"

const mongoURI = "mongodb://127.0.0.1:27017/Cold_Chain_Logistics"


const connectToMongo= async () =>{
   await mongoose.connect(mongoURI,console.log("connected"))
}



export default connectToMongo