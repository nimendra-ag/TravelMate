import { model } from "mongoose";
const UserModel = model('Users',{
    firstName:{
        type:String,
        
    },
    lastName:{
        type:String,
    
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
    },
    country:{
        type: String,
    },
    state:{
        type: String,
    },
    mobile:{
        type: String,
    },
    birthday:{
        type: Date,
    },
    gender:{
        type: String,
    },
    profilePic:{
        type: String,
    },
})


export{UserModel}