import { model } from "mongoose";
const CityModel = model('cities',{
    name:{
        type:String,
        
    },
    image:{
        type:String,
    
    },
    discription:{
        type: String,
        
    }
})


export{CityModel}