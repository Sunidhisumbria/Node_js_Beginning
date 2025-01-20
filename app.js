import express from "express"
const app = express();
import UserRouter from './routes/user.js'
import { connectDb } from "./middlewares/db.js";
import {config} from 'dotenv'
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'

config()
// const port = process.env.PORT

connectDb()
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({
    extended:true
}))
app.use("/api/v1",UserRouter)

// app.post("/abc",(req,res)=>{
//     res.send(req.body)
// })
app.use("/",(req,res)=>{
    
    res.send("API is working ")
})
app.listen(4000,()=>{
    console.log(`server is running on port ${4000}`)

});

