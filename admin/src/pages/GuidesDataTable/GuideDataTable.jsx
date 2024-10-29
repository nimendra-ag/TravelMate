import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const GuideDataTable = () => {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Language',
      selector: row => row.language,
    },
    {
      name: 'NICNo',
      selector: row => row.nic_no,
    },
    {
      name: 'Contact Number',
      selector: row => row.contact_number,
    },
    {
      name: 'Areas',
      selector: row => row.area,
    },
    {
      name: 'Charges Per day(LKR)',
      selector: row => row.charges_per_day,
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
    { name: 'John Doe', language: 'English', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Jane Doe', language: 'Sinhala', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Michael Smith', language: 'Tamil', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Emily Johnson', language: 'English', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'David Wilson', language: 'Sinhala', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Sarah Thompson', language: 'Tamil', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Olivia Davis', language: 'English', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Daniel Anderson', language: 'Sinhala', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Emma Thompson', language: 'Tamil', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Matthew Johnson', language: 'English', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Avery Wilson', language: 'Sinhala', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Ethan Thompson', language: 'Tamil', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Isabella Davis', language: 'English', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Jackson Anderson', language: 'Sinhala', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
    { name: 'Mia Thompson', language: 'Tamil', nic_no: '123456789V', contact_number: '1234567890', area: 'Colombo', charges_per_day: '5000', },
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
        width: '920px',
        height: '640px',
        top: '110px',
        left: '585px',
        border: '1px solid #ccc',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <h1>Guide Data Table</h1>
      <div className="d-flex justify-content-end mb-4">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Filter by Name"
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
        />

        <Link to="/add-new-guide">
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
            Add a Guide
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
            borderRadius: '30px',
            cursor: 'pointer',
          }}
        >
          Delete Selected Guides
        </button>
      </div>
    </div>
  );
}

export default GuideDataTable
