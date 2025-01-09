import {Schema,model} from "mongoose";


const userSchema = new Schema({
    name:{type:String,},
    email:{type:String,unique:true},
    phone:{type:String},
    password:{type:String,required:true,select:false}

});


export const  User = model("users",userSchema) 

// const 
