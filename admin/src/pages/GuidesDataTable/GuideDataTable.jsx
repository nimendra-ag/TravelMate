import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";

const GuidesDataTable = () => {
  const navigate = useNavigate();

  // Columns adjusted to match the API response structure
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name || "N/A",
      sortable: true,
    },
    {
      name: "Languages",
      selector: (row) => (row.languages ? row.languages.join(", ") : "N/A"),
    },
    {
      name: "Charges Per Day",
      selector: (row) => row.chargesPerDay || "N/A",
    },
    {
      name: "Areas",
      selector: (row) => (row.area ? row.area.join(", ") : "N/A"),
    },
    {
      name: "Description",
      selector: (row) => row.description || "N/A",
    },
    {
      name: "View More",
      cell: (row) => (
        <button
          style={{
            backgroundColor: "#0A2E41",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "30px",
            cursor: "pointer",
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

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch("http://localhost:3000/travelmate/allGuides");
        const result = await response.json();

        if (result.success) {
          setRecords(result.guides); // Use guides array from the API response
          setFilteredRecords(result.guides);
        } else {
          console.error("Failed to fetch guides:", result.error);
        }
      } catch (error) {
        console.error("Error fetching Guides data:", error);
      }
    };

    fetchGuides();
  }, []);

  const handleFilter = (event) => {
    const newData = filteredRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const handleViewMore = (row) => {
    navigate(`/guide-details/${row._id}`);
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleDeleteSelected = () => {
    const updatedRecords = records.filter((row) => !selectedRows.includes(row));
    setRecords(updatedRecords);
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "1120px",
        height: "640px",
        top: "110px",
        left: "365px",
        border: "1px solid #ccc",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h1>Guide Data Table</h1>
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Filter by Name"
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />

        <Link to="/add-new-guide">
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
            Add a Guide
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
            backgroundColor: "#0A2E41",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete Selected Guides
        </button>
      </div>
    </div>
  );
};

export default GuidesDataTable;
