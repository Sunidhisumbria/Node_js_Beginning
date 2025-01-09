import express from 'express';
import {register,login,profile, deleteUser,updateEditUser} from "../controllers/user.js"
import { LoggedInUserOnly } from '../middlewares/db.js';

const app = express.Router();


app.post("/register",register)
app.post("/login",login)

app.use(LoggedInUserOnly)
app.get("/me",profile) // access withtoken
// app.get("/me/:id",profile)
app.delete("/deleteUser/:id",deleteUser)
app.put("/updateEditUser/:id",updateEditUser)
 




export default app; 