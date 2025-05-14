import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';

const PrePlannedTripsDataTable = () => {
  const navigate = useNavigate();
  
  // Define columns with the fixed button attribute
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
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
      // Fix: Change from boolean to string
      button: "true",
    },
  ];

  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchPrePlannedTrips();
  }, []);

  const fetchPrePlannedTrips = async () => {
    try {
      const response = await fetch('http://localhost:3000/travelmate/allPrePlannedTrips');
      const data = await response.json();
      setRecords(data);
      setFilteredRecords(data);
    } catch (error) {
      console.error('Error fetching trips data:', error);
    }
  };

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = records.filter(row => {
      return row.name?.toLowerCase().includes(searchTerm);
    });
    setFilteredRecords(filteredData);
  }

  function handleViewMore(row) {
    navigate(`/view-pre-planned-trip/${row.id}`);
  }

  function handleRowSelected(state) {
    setSelectedRows(state.selectedRows);
  }

  async function handleDeleteSelected() {
    try {
      for (let row of selectedRows) {
        await fetch("http://localhost:3000/travelmate/deletePrePlannedTrip", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: row.id }),
        });
      }
      const updatedRecords = records.filter(row => !selectedRows.includes(row));
      setRecords(updatedRecords);
      setFilteredRecords(updatedRecords);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  }

  // Custom styles for the data table
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
      },
    },
    rows: {
      style: {
        minHeight: '60px',
      },
    },
  };

  return (
    
    <Container className="py-5">
        <div
      style={{
       
        marginTop: '110px',
        
      }}
    ></div>
      <h2 className="mb-4">Pre-Planned Trips Management</h2>
      
      <div className="d-flex justify-content-between mb-4">
        <div>
          <Form.Control
            type="text"
            placeholder="Search by trip name..."
            onChange={handleFilter}
            className="form-control"
            style={{ width: '300px' }}
          />
        </div>
        <div>
          <Button 
            variant="danger" 
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
            className="me-2"
          >
            Delete Selected
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/add-pre-planned-trips')}
          >
            Add New Trip
          </Button>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={filteredRecords}
        pagination
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        highlightOnHover
        responsive
        striped
        customStyles={customStyles}
        noDataComponent="No pre-planned trips found"
      />
    </Container>
  );
};

export default PrePlannedTripsDataTable;
