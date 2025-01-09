import { User } from "../models/user.js";
import {hash,compare} from  'bcrypt';
import jwt from 'jsonwebtoken';



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

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(400).json({
      success: false,
      message: "Invalid email or Password",
    });
    const isPasswordMatch = await compare(password,user.password)
  if(!isPasswordMatch)  return res.status(400).json({
      success:false,
      message:"Invalid email or Password"
  });
  const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    expiresIn: '1h',
    });



   
   return res.status(200).cookie("test-token",token,{
    maxAge:1000*60*60*24,
    httpOnly:true

   }).json({
    success: true,
    message: "User loggedIn Successfully",
    user,
    token
  });
};

const profile = async (req, res) => {
  // const userId = req.params.id;
  // const user = await User.findById(userId);
  const user = await User.findById(req.user); // req.user at db token access
  return res.status(200).json({
    success: false,
    message: "Get Profile Successfully",
    user,
  });
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully", user });
};




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

export { register, login, profile, deleteUser, updateEditUser };
