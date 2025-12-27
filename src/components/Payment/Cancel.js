import React from "react";

function Cancel() {
  return (
    <div style={{ 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }}>
      <h1 style={{ color: "white" }}>Payment Cancelled</h1>
      <p style={{ color: "white" }}>
        Your payment was not processed. Please try again.
      </p>
    </div>
  );
}

export default Cancel;
