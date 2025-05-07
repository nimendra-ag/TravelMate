import React from "react";

const PaymentDetailsForm = ({ totalPayment }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        width: "800px",
        margin: "20px auto",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: "0" }}>Credit/Debit Card Payments</h2>
        <h3 style={{ margin: "0", color: "#0A2E41" }}>
          Total Payment: ${totalPayment}
        </h3>
      </div>

      {/* Form Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          width: "100%",
        }}
      >
        {/* Card Details Section */}
        <div style={{ flex: 1 }}>
          <h4>Card Details</h4>
          <div style={{ marginBottom: "15px" }}>
            <label>Cardholder’s Name</label>
            <input
              type="text"
              placeholder="Enter Cardholder’s Name"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Card Number</label>
            <input
              type="text"
              placeholder="Enter Card Number"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Expiration Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>CVV/CVC</label>
            <input
              type="password"
              placeholder="Enter CVV/CVC"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Email for Receipt</label>
            <input
              type="email"
              placeholder="Enter Email for Receipt"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Billing Address Section */}
        <div style={{ flex: 1 }}>
          <h4>Billing Address</h4>
          <div style={{ marginBottom: "15px" }}>
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Enter Street Address"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>City</label>
            <input
              type="text"
              placeholder="Enter City"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>State/Province</label>
            <input
              type="text"
              placeholder="Enter State/Province"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Postal Code/ZIP</label>
            <input
              type="text"
              placeholder="Enter Postal Code/ZIP"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Country</label>
            <input
              type="text"
              placeholder="Enter Country"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            backgroundColor: "#0A2E41",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

// Shared Input Styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginTop: "5px",
  fontSize: "14px",
};

export default PaymentDetailsForm;
