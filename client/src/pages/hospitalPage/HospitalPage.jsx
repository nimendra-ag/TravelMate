import React from 'react'
import { ClientContext } from '../../context/ClientContext';
import { useParams } from 'react-router-dom';
import HospitalDetails from '../../components/hospitalDetails/HospitalDetails';

const HospitalPage = () => {
    const {allHospitals} = useContext(ClientContext);
    const {id} = useParams();
    const hospital = allHospitals.find((e)=>e.id === parseInt(id));
    console.log(hospital)
  return (
<>
            {hospital ? <>
                <HospitalDetails
                    id={hospital.id}
                    name={hospital.name}
                    description={hospital.description}
                    address={hospital.address}
                    contactNumber={hospital.contactNumber}
                    email={hospital.email}
                    website={hospital.website}
                    category={hospital.category}
                    image={hospital.image}
                    nearestCity={hospital.nearestCity}
                    distanceFromNearestCity={hospital.distanceFromNearestCity}

                />
                
            </> : <></>}

        </>  )
}

export default HospitalPage