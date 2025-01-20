import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

cloudinary.config({
    cloud_name: 'dqr2mxlv3', 
    api_key: '847423956334364', 
    api_secret: 'ueGE5KG28uAXIpw-JSVnE6P8omM'
  });

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
    req.user = decodedData.userId; // to get user info by token

    next()
}


const uploadSingleFile = async (req, res) => {
  
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }
  
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'avatars', // Folder name in Cloudinary
      });
  
      // Delete the file from the local folder
      await fs.unlink(req.file.path);
  
      // Save file details to MongoDB
      const fileDetails = new File({
        originalName: req.file.originalname,
        fileName: result.public_id,
        filePath: result.secure_url,
        size: req.file.size,
        mimeType: req.file.mimetype,
      });
  
      await fileDetails.save();
      return result
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("An error occurred while uploading the file");
    }
  };

export {
    connectDb,
    uploadSingleFile
}