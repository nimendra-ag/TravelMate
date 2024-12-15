import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const TransportModeDataTable = () => {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Vehicle Type',
      selector: row => row.vehicle_type,
    },
    {
      name: 'Charges per Hour(LKR)',
      selector: row => row.charges_per_hour,
    },
    {
      name: 'Number of Passengers',
      selector: row => row.no_of_passangers,
    },
    {
      name: 'View More',
      cell: (row) => (
        <button
          style={{
            backgroundColor: '#0A2E41',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '30px',
            cursor: 'pointer',
          }}
          onClick={() => handleViewMore(row)}
        >
          View More
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const initialData = [
    { name: 'Bus', description: 'Description 1', vehicle_type: 'Bus', charges_per_hour: '1000', no_of_passangers: '4' },
    { name: 'Car', description: 'Description 2', vehicle_type: 'Car', charges_per_hour: '2000', no_of_passangers: '2' },
    { name: 'Train', description: 'Description 3', vehicle_type: 'Train', charges_per_hour: '3000', no_of_passangers: '3' },
    { name: 'Flight', description: 'Description 4', vehicle_type: 'Flight', charges_per_hour: '4000', no_of_passangers: '1' },
    { name: 'Ship', description: 'Description 5', vehicle_type: 'Ship', charges_per_hour: '5000', no_of_passangers: '5' },
    { name: 'Airplane', description: 'Description 6', vehicle_type: 'Airplane', charges_per_hour: '6000', no_of_passangers: '6' },
    { name: 'Bike', description: 'Description 7', vehicle_type: 'Bike', charges_per_hour: '7000', no_of_passangers: '7' },
  ];

  const [records, setRecords] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);

  function handleFilter(event) {
    const newData = initialData.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setRecords(newData);
  }

  function handleViewMore(row) {
    alert(`View more details for ${row.name}`);
  }

  function handleAddHotel() {
    const newTransportMode = {
      name: `Transport Mode ${records.length + 1}`,
      description: `Description ${records.length + 1}`,
      vehicle_type: `Vehicle Type ${records.length + 1}`,
      charges_per_hour: `${1000 * (records.length + 1)}`,
      no_of_passangers: `${records.length + 1}`,
    };

    setRecords([...records, newTransportMode]);
  }

  function handleRowSelected(state) {
    setSelectedRows(state.selectedRows);
  }

  function handleDeleteSelected() {
    const updatedRecords = records.filter(row => !selectedRows.includes(row));
    setRecords(updatedRecords);
  }

  return (
    <div
      style={{
        position: 'absolute',
        width: '1120px',
        height: '640px',
        top: '110px',
        left: '365px',
        border: '1px solid #ccc',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <h1>Transport Modes Data Table</h1>
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Filter by Name"
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
        />


        <Link to="/add-transportation-service">
          <button
            onClick={handleAddHotel}
            style={{
              backgroundColor: '#0A2E41',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add a Transport Mode
          </button>
        </Link>

      </div>
      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        selectableRows
        onSelectedRowsChange={handleRowSelected}
      />
      <div className="d-flex justify-content-end mt-3">
        <button
          onClick={handleDeleteSelected}
          style={{
            backgroundColor: '#0A2E41',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '30px',
            cursor: 'pointer',
          }}
        >
          Delete Selected Transport Modes
        </button>
      </div>
    </div>
  );
}

export default TransportModeDataTable;
