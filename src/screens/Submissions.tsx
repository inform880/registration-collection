import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import "./Submissions.css";

const Submissions = () => {

  const [tabledata, setTabledata] = useState([]);
  const [selectedRow, setSelectedRow] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://registration-14429.nodechef.com/", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => setTabledata(data))
      .then(() => setIsLoading(false));
  }, [])

  if (isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address 1</th>
          <th>Address 2</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
          <th>Country</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {tabledata.map(({ id, firstname, lastname, address1, address2 = "", city, state, zip, country, datetime }) =>
          <tr onClick={() => setSelectedRow(id)} key={id} className={id === selectedRow ? "active-row" : ""}>
            <td>{id}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{address1}</td>
            <td>{address2}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{zip}</td>
            <td>{country}</td>
            <td>{new Date(datetime).toLocaleString()}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Submissions;