import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";

const GuidesDataTable = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

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
      cell: row => (
        <span>
          {row.description && row.description.length > 20
            ? `${row.description.substring(0, 20)}...`
            : row.description}
        </span>
      ),
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

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch("http://localhost:3000/travelmate/allGuides");
      const result = await response.json();

      if (result.success) {
        setRecords(result.guides);
        setFilteredRecords(result.guides);
      } else {
        console.error("Failed to fetch guides:", result.error);
      }
    } catch (error) {
      console.error("Error fetching Guides data:", error);
    }
  };

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = records.filter(row => {
      const nameMatch = row.name?.toLowerCase().includes(searchTerm);
      const areaMatch = row.area?.some(area => 
        area.toLowerCase().includes(searchTerm)
      );
      const languageMatch = row.languages?.some(language => 
        language.toLowerCase().includes(searchTerm)
      );
      return nameMatch || areaMatch || languageMatch;
    });
    setFilteredRecords(filteredData);
  }

  const handleViewMore = (row) => {
    navigate(`/view-guide/${row.id}`);
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  async function handleDeleteSelected() {
    try {
      for (let row of selectedRows) {
        await fetch("http://localhost:3000/travelmate/deleteGuide", {
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
      console.error("Error deleting guides:", error);
    }
  }

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
          placeholder="Search by Name, Area, or Language"
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
            width: "250px"
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
