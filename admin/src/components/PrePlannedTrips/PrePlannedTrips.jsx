import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import PrePlannedTripsDataTable from '../../pages/PrePlannedTripsDataTable/PrePlannedTripsDataTable';

const PrePlannedTrips = () => {
    const {allPrePlannedTrips} = useContext(AdminContext);
    console.log(allPrePlannedTrips)
  return (
    <div>
        <PrePlannedTripsDataTable/>
    </div>
  )
}

export default PrePlannedTrips