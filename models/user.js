import {Schema,model} from "mongoose";


const userSchema = new Schema({
    name:{type:String,},
    email:{type:String,unique:true},
    phone:{type:String},
    password:{type:String,required:true,select:false}

});


const fileSchema = new Schema(
    {
      originalName: { type: String, required: true }, 
      fileName: { type: String, required: true }, 
      filePath: { type: String, required: true }, 
      size: { type: Number, required: true }, 
      mimeType: { type: String, required: true }, 
      uploadedBy: { type: Schema.Types.ObjectId, ref: "users" }, 
      uploadDate: { type: Date, default: Date.now }, 
    },
    {
      timestamps: true, 
    })

export const  User = model("users",userSchema) ;
export const File = model("files", fileSchema);

// const 
