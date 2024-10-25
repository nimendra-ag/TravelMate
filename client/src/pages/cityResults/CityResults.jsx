import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CityHero from '../../components/cityHero/CityHero';
import kandy from "../../assets/kandy.jpeg"
import ThingsToDo from '../../components/thinsToDo/ThingsToDo';
import BestNearby from '../../components/bestNearby/BestNearby';
import GetYourGuid from '../../components/getYourGuid/GetYourGuid';
import EmbeddedMap from '../../components/map/EmbeddedMap';
const CityResults = () => {

  const [city, setCity] = useState("");

  const { id } = useParams(); // Get the ID from the URL



  useEffect(() => {
    axios.get(`http://localhost:3000/travelmate/getcity/${id}`)
    
    
        .then((res) => {
            if (res.data.success) {
                const city = res.data.city;
                setCity(city);
                console.log(city);
                
            }
        })
        .catch((err) => {
            console.log("Error is", err);
        });
}, []);
  return (
    <div>





          <CityHero name={city.name} description={city.description} image={kandy} />


          
           
                    

                  
            

            <div style={{paddingInline:'60px'}}>

            <ThingsToDo/>


            <BestNearby/>


            <GetYourGuid/>

            <EmbeddedMap/>

            </div>

          
      












    </div>
  )
}

export default CityResults