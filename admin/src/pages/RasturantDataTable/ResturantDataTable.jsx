import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const ResturantDataTable = () => {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
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
    { name: 'Restaurant 1', category: 'Category 1', availability: 'Available', rate: 'Rate 1', area: 'Area 1', },
    { name: 'Restaurant 2', category: 'Category 2', availability: 'Available', rate: 'Rate 2', area: 'Area 2', },
    { name: 'Restaurant 3', category: 'Category 3', availability: 'Available', rate: 'Rate 3', area: 'Area 3', },
    { name: 'Restaurant 4', category: 'Category 4', availability: 'Available', rate: 'Rate 4', area: 'Area 4', },
    { name: 'Restaurant 5', category: 'Category 5', availability: 'Available', rate: 'Rate 5', area: 'Area 5', },
    { name: 'Restaurant 6', category: 'Category 6', availability: 'Available', rate: 'Rate 6', area: 'Area 6', },
    { name: 'Restaurant 7', category: 'Category 7', availability: 'Available', rate: 'Rate 7', area: 'Area 7', },
    { name: 'Restaurant 8', category: 'Category 8', availability: 'Available', rate: 'Rate 8', area: 'Area 8', },
    { name: 'Restaurant 9', category: 'Category 9', availability: 'Available', rate: 'Rate 9', area: 'Area 9', },
    { name: 'Restaurant 10', category: 'Category 10', availability: 'Available', rate: 'Rate 10', area: 'Area 10', },
    { name: 'Restaurant 11', category: 'Category 11', availability: 'Available', rate: 'Rate 11', area: 'Area 11', },
    { name: 'Restaurant 12', category: 'Category 12', availability: 'Available', rate: 'Rate 12', area: 'Area 12', },
    { name: 'Restaurant 13', category: 'Category 13', availability: 'Available', rate: 'Rate 13', area: 'Area 13', },


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
      <h1>Resturant Data Table</h1>
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Filter by Name"
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
        />

        <Link to="/add-restaurant">
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
            Add a Resturant
          </button>      </Link>
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
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Delete Selected Resturants
        </button>
      </div>
    </div>
  );
}

export default ResturantDataTable
