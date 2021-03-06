import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const SubmissionConfirmation = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const [isLoading, setIsLoading] = useState(true);
  const [failedToGetSubmission, setFailedToGetSubmission] = useState(false);
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
    setIsLoading(true);
    if (id) {
      fetch(`https://registration-14429.nodechef.com/?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => response.json())
        .then(data => setRowData(data))
        .then(() => setIsLoading(false))
        .catch(() => {
          setIsLoading(false);
          setFailedToGetSubmission(true);
        });
    }
  }, [id]);

  if (isLoading) {
    <LoadingSpinner />
  }

  return (
    <div>
      <header className="Form-header">
        <h1>
          Registration Confirmed!
        </h1>
      </header>
      {failedToGetSubmission ?
        <p>Failed to get Submission. Try refreshing the page. </p> :
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
        </form>}
    </div>
  )
}

export default SubmissionConfirmation;
