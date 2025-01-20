import express from 'express';

import {register,login,profile, deleteUser,updateEditUser, logout, uploadSingleFile} from "../controllers/user.js"
import { LoggedInUserOnly } from '../middlewares/db.js';
import multer from 'multer';
const uploadFile = multer({dest:"../uploadImg"})

const app = express.Router();


app.post("/register",register)
app.post("/login",login)

app.use(LoggedInUserOnly)
app.get("/me",profile) 
// app.get("/me/:id",profile)
app.delete("/deleteUser/:id",deleteUser)
app.put("/updateEditUser/:id",updateEditUser)
app.post("/logout",logout)
app.post("/uploadSingleImg",uploadFile.single("avatar"),uploadSingleFile)
 




export default app; 





