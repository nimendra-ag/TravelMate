import { CityModel } from "../models/Citiy.js";




export  function getCities(req,res){

    CityModel.find().then((data)=>{
        res.status(200).json(data)}
    ).then((err)=>{console.log(err);
    })
}

// const getCities = async (req, res) => {
//     try {
//         let hotels = await CityModel.find({});
//         console.log("All Cities Fetched");
//         console.log(hotels);
//         res.send(hotels);
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, error: 'Server Error' });

//     }
// }

// export  {getCities};








