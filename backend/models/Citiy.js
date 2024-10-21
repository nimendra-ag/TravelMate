import { model } from "mongoose";
const CityModel = model('cities',{
    name:{
        type:String,
        
    },
    image:{
        type:String,
    
    },
    description:{
        type: String,
        
    },
    type:{
        type:String,
        
    },
    minidescription:{
        type:String,
        
    },


})


export{CityModel}