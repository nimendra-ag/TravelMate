import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';

const RestaurantDataTable = () => {
  const navigate = useNavigate();
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      cell: row => (
        <span>
          {row.description?.length > 20
            ? `${row.description.substring(0, 20)}...`
            : row.description}
        </span>
      ),
    },
    {
      name: 'Description',
      selector: row => row.description,
      cell: row => (
        <span>
          {row.description?.length > 30
            ? `${row.description.substring(0, 30)}...`
            : row.description}
        </span>
      ),
    },
    {
      name: 'Email',
      selector: row => row.email,
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
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:3000/travelmate/allRestaurants');
      const data = await response.json();
      setRecords(data);
      setFilteredRecords(data);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
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
    navigate(`/view-restaurant/${row.id}`);
  }

  function handleRowSelected(state) {
    setSelectedRows(state.selectedRows);
  }

  async function handleDeleteSelected() {
    try {
      for (let row of selectedRows) {
        await fetch("http://localhost:3000/travelmate/deleteRestaurant", {
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
      console.error("Error deleting Restaurants:", error);
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
      <h1>Restaurant Data Table</h1>
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
            width: '200px'
          }}
        />

        <Link to="/add-restaurant">
          <button
            style={{
              backgroundColor: '#0A2E41',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add a Restaurant
          </button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={filteredRecords}
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
          Delete Selected Restaurants
        </button>
      </div>
    </div>
  );
}

export default RestaurantDataTable;
