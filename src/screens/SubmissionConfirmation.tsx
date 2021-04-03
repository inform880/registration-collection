import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const SubmissionConfirmation = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const [rowData, setRowData] = useState({
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => response.json())
        .then(data => setRowData(data));
    }
  }, [id]);

  return (
    <div>
      <header className="Form-header">
        <h1>
          Registration Confirmed!
        </h1>
      </header>
      <form className="Form-container">
        <div className="Input-container">
          <label>First Name</label>
          <input value={rowData.firstname} disabled />
        </div>
        <div className="Input-container">
          <label>Last Name</label>
          <input value={rowData.lastname} disabled />
        </div>
        <div className="Input-container">
          <label>Address 1</label>
          <input value={rowData.address1} disabled />
        </div>
        <div className="Input-container">
          <label>Address 2</label>
          <input value={rowData.address2} disabled />
        </div>
        <div className="Input-container">
          <label>City</label>
          <input value={rowData.city} disabled />
        </div>
        <div className="Input-container">
          <label>State</label>
          <input value={rowData.state} disabled />
        </div>
        <div className="Input-container">
          <label>Zip</label>
          <input value={rowData.zip} disabled />
        </div>
        <div className="Input-container">
          <label>Country</label>
          <input value={rowData.country} disabled />
        </div>
      </form>
    </div>
  )
}

export default SubmissionConfirmation;
