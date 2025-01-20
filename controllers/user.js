import { User, File } from "../models/user.js";
import {hash,compare} from  'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dqr2mxlv3', 
        api_key: '847423956334364', 
        api_secret: 'ueGE5KG28uAXIpw-JSVnE6P8omM' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();







 //----------------------------Registeration Api-------------------//

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!email || !phone || !password || !name)
    return res.status(400).json({
      success: false,
      message: "ALL field are required ",
    });
 
   const bcryptPassword = await hash(password,10)
  await User.create({
    name,
    email,
    password:bcryptPassword,
    phone,
  });
  res.status(201).json({
    success: true,
    message: "User created successfully",
  });
};

 //----------------------------Login Api-------------------//

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(400).json({
      success: false,
      message: "Invalid email or Password",
    });
    const isPasswordMatch = await compare(password,user.password) // to compare the encrypted password with normai
  if(!isPasswordMatch)  return res.status(400).json({
      success:false,
      message:"Invalid email or Password"
  });
  const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    expiresIn: '1h',
    });

 return res.status(200).cookie("test-token",token,{
    maxAge:1000*60*60*24, // to the token after sometime
    httpOnly:true

   }).json({
    success: true,
    message: "User loggedIn Successfully",
    user,
    token
  });
};


 //----------------------------GetUserProfile-------------------//

const profile = async (req, res) => {
  console.log(req)
  // const userId = req.params.id;
  // const user = await User.findById(userId);
  const user = await User.findById(req.user); // req.user at db token access
  return res.status(200).json({
    success: false,
    message: "Get Profile Successfully",
    user,
  });
};

 //----------------------------DeleteUser Api-------------------//

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully", user });
};


 //----------------------------EditUser Api-------------------//

const updateEditUser = async (req, res) => {
    const userId = req.params.id;
    const bodyData = req.body
    const user = await User.findById(userId)
    if(bodyData.name)  user.name = bodyData.name;
    if(bodyData.email)  user.email = bodyData.email;
    if(bodyData.phone)  user.phone = bodyData.phone;
     await user.save()

  res.status(201).json({
    success: true,
    message: "User Updated successfully",
    user
  });
};

//-------------------------------logout------------------------------// 

const logout  = async(req,res) => {
await res.clearCookie("test-token"); //  removing token getting from request
// return res.status(200).cookie("test-token","",{maxAge:0}).json({  //----another method for logout--------//
return res.status(200).json({
  success: true,
  message: "User Logout Successfull",
  
})
}

//-------------------------------Upload------------------------------// 



const uploadSingleFile = async (req, res) => {
  console.log(req.file, "==========");

  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    
    const fileDetails = new File({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
    });

    await fileDetails.save();
    res.status(201).send({ message: "File uploaded successfully", file: fileDetails });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("An error occurred while uploading the file");
  }
};


//-------------------------------GetUploaded file------------------------------//

export { register, login, profile, deleteUser, updateEditUser,logout, uploadSingleFile};





