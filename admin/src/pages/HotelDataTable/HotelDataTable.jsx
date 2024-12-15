import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const HotelDataTable = () => {
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
      name: 'Availability',
      selector: row => row.availability,
    },
    {
      name: 'Rate',
      selector: row => row.rate,
    },
    {
      name: 'Area',
      selector: row => row.area,
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
    { name: 'Hotel 1', description: 'Description 1', availability: 'Available', rate: 'Rate 1', area: 'Area 1' },
    { name: 'Hotel 2', description: 'Description 2', availability: 'Full', rate: 'Rate 2', area: 'Area 2' },
    { name: 'Hotel 3', description: 'Description 3', availability: 'Available', rate: 'Rate 3', area: 'Area 3' },
    { name: 'Hotel 4', description: 'Description 4', availability: 'Full', rate: 'Rate 4', area: 'Area 4' },
    { name: 'Hotel 5', description: 'Description 5', availability: 'Available', rate: 'Rate 5', area: 'Area 5' },
    { name: 'Hotel 6', description: 'Description 6', availability: 'Full', rate: 'Rate 6', area: 'Area 6' },
    { name: 'Hotel 7', description: 'Description 7', availability: 'Available', rate: 'Rate 7', area: 'Area 7' },
    { name: 'Hotel 8', description: 'Description 8', availability: 'Full', rate: 'Rate 8', area: 'Area 8' },
    { name: 'Hotel 9', description: 'Description 9', availability: 'Available', rate: 'Rate 9', area: 'Area 9' },
    { name: 'Hotel 10', description: 'Description 10', availability: 'Full', rate: 'Rate 10', area: 'Area 10' },
    { name: 'Hotel 11', description: 'Description 11', availability: 'Available', rate: 'Rate 11', area: 'Area 11' },
    { name: 'Hotel 12', description: 'Description 12', availability: 'Full', rate: 'Rate 12', area: 'Area 12' },
    { name: 'Hotel 13', description: 'Description 13', availability: 'Available', rate: 'Rate 13', area: 'Area 13' },
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
    const newHotel = {
      name: `Hotel ${records.length + 1}`,
      description: `Description ${records.length + 1}`,
      availability: 'Available', // Default availability
      rate: `Rate ${records.length + 1}`,
      area: `Area ${records.length + 1}`,
    };

    setRecords([...records, newHotel]);
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
      <h1>Hotel Data Table</h1>
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Filter by Name"
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
        />
        <Link to="/add-new-hotel">
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
            Add a Hotel
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
          Delete Selected Hotels
        </button>
      </div>
    </div>
  );
};

export default HotelDataTable;
