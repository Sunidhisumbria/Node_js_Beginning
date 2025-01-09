import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const connectDb = () =>{
     mongoose.connect("mongodb://127.0.0.1:27017/sunidhiDb").then((res)=>{
        console.log(`Database is connected with host:-${res.connection.host}`)
    }).catch((err)=>{
        console.log(`************** Database is not connected ***************** `,err)
    })
};

export const LoggedInUserOnly = (req,res,next)=>{
    const token  = req.cookies["test-token"];
    if(!token) return res.status(401).json({
        success:false,
        message:"Unauthorized user,please login !"
    })
    const decodedData = jwt.verify(token,"your-secret-key")
    req.user = decodedData.userId;

    next()
}


 

export {
    connectDb
}