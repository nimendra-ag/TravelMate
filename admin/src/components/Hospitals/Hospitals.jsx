import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import HospitalDataTable from '../../pages/HospitalDataTable/HospitalDataTable';

const Hospitals = () => {
    const {allHospitals} = useContext(AdminContext);
    console.log(allHospitals)
  return (
    <div>
        <HospitalDataTable/>
    </div>
  )
}

export default Hospitals;