import express from "express"
const app = express()
import cors from "cors"
import connectToMongo from "./db.js"
import auth from "./path/auth.js"
import invdata from "./path/invdata.js"
import mongoose, { connect } from "mongoose"
import User from "./models/user.js"
import jwt from 'jsonwebtoken'
import fetchUser from './fetchUser.js'

// mongoose.connect('mongodb://localhost:27017/authentication')
app.use(cors())
app.use(express.json())

connectToMongo();



app.use('/api/auth',auth)
app.use('/api/invdata',invdata)


app.listen(5000,()=>
    console.log('this bis the server')
)
//asdas