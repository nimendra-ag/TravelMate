import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import HotelDataTable from '../../pages/HotelDataTable/HotelDataTable';
const Hotels = () => {
  const {allAccomodations} = useContext(AdminContext);
  console.log(allAccomodations)
  return (
    <div>
      <HotelDataTable/>
    </div>
  );
};

export default Hotels;