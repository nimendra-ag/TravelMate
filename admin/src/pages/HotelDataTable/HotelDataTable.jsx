import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';

const HotelDataTable = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Columns with adjusted widths
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      width: '15%', 
    },
    {
      name: 'Description',
      selector: row => row.description,
      cell: row => (
        <span>
          {row.description.length > 30
            ? `${row.description.substring(0, 30)}...`
            : row.description}
        </span>
      ),
      width: '25%', 
    },
    {
      name: 'Availability',
      selector: row => (row.available ? 'Available' : 'Not Available'),
      width: '15%', 
    },
    {
      name: 'Rate',
      selector: row => row.rating,
      width: '10%', 
    },
    {
      name: 'Area',
      selector: row => row.address,
      width: '15%', 
    },
    {
      name: 'View More',
      cell: row => (
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
      width: '12%', 
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const [records, setRecords] = useState([]); // Stores all the hotel records
  const [filteredRecords, setFilteredRecords] = useState([]); // Stores filtered hotel records
  const [selectedRows, setSelectedRows] = useState([]);

  
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch('http://localhost:3000/travelmate/allAccomodations');
        const data = await response.json();
        setRecords(data); // Set the fetched data to records state
        setFilteredRecords(data); // Initially set filtered records to all fetched data
      } catch (error) {
        console.error('Error fetching accommodations data:', error);
      }
    };

    fetchAccommodations();
  }, []); // Empty dependency array to fetch data once on component mount

  // Handle filter input
  function handleFilter(event) {
    const filteredData = records.filter(row =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredRecords(filteredData); // Set the filtered data to filteredRecords state
  }

  // Handle the "View More" button click
  function handleViewMore(row) {
    navigate(`/view-hotel/${row.id}`);
  }

  // Handle adding a new hotel (optional functionality)
  function handleAddHotel() {
    const newHotel = {
      name: `Hotel ${records.length + 1}`,
      description: `Description ${records.length + 1}`,
      available: true,
      rating: 3, // Default rating
      address: `Area ${records.length + 1}`,
    };

    setRecords([...records, newHotel]);
    setFilteredRecords([...filteredRecords, newHotel]); // Add new hotel to filtered records as well
  }

  // Handle row selection
  function handleRowSelected(state) {
    setSelectedRows(state.selectedRows);
  }

  // Handle deleting selected rows
  async function handleDeleteSelected() {
    try {
      for (let row of selectedRows) {
        await fetch('http://localhost:3000/travelmate/deleteAccommodation', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: row.id }),
        });
      }
      // Update local state after successful deletion
      const updatedRecords = records.filter(row => !selectedRows.includes(row));
      setRecords(updatedRecords);
      setFilteredRecords(updatedRecords); // Update filtered records
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting hotels:', error);
    }
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
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
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
        data={filteredRecords} // Use filtered records for data
        fixedHeader
        pagination
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        responsive
        customStyles={{
          table: {
            style: {
              width: '100%', // Ensures the table fits the container width
            },
          },
        }}
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
