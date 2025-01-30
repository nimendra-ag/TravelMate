import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const DestinationsDataTable = () => {
  const navigate = useNavigate();
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      cell: row => (
        <span>
          {row.description.length > 20
            ? `${row.description.substring(0, 20)}...`
            : row.description}
        </span>
      ),
    },
    {
      name: 'City',
      selector: row => row.city,
    },
    {
      name: 'Category',
      selector: row => row.category,
    },
    {
      name: 'Website',
      selector: row => row.website,
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

  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:3000/travelmate/allDestinations')
      .then(response => {
        setRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function handleFilter(event) {
    const query = event.target.value.toLowerCase();
    const filteredData = records.filter(row => row.name.toLowerCase().includes(query));
    setRecords(filteredData);
  }

  function handleViewMore(row) {
    navigate(`/view-destination/${row.id}`);
  }

  function handleAddDestination() {
    const newDestination = {
      name: `Destination ${records.length + 1}`,
      description: `Description ${records.length + 1}`,
      availability: 'Available',
      rate: `Rate ${records.length + 1}`,
      area: `Area ${records.length + 1}`,
    };

    setRecords([...records, newDestination]);
  }

  function handleRowSelected(state) {
    setSelectedRows(state.selectedRows);
  }

  async function handleDeleteSelected() {
    try {
      for (let row of selectedRows) {
        await fetch("http://localhost:3000/travelmate/deleteDestination", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: row.id }), // Ensure `row.id` contains the correct guide ID
        });
      }
      // Update local state after successful deletion
      const updatedRecords = records.filter(row => !selectedRows.includes(row));
      setRecords(updatedRecords);
      setFilteredRecords(updatedRecords); // Update filtered records
      setSelectedRows([]); // Clear selected rows
    } catch (error) {
      console.error("Error deleting guides:", error);
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
      <h1>Destination Data Table</h1>
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Filter by Name"
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
        />
         <Link to="/add-destination">
                  <button
                    style={{
                      backgroundColor: "#0A2E41",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Add a Destination
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
          Delete Selected Destinations
        </button>
      </div>
    </div>
  );
};

export default DestinationsDataTable;
