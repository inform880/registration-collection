import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SubmissionForm.css';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
const countries = ['United States'];

const SubmissionForm = () => {
  const history = useHistory();
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    city: "",
    state: states[0],
    zip: "",
    country: countries[0],
  });

  const [frontendError, setFrontendError] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormInput = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [key]: event.target.value,
    })
  }

  const updateFormSelect = (key: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormdata({
      ...formdata,
      [key]: event.target.value,
    })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFrontendError(null);
    setBackendError(null);

    const { firstname, lastname, address1, city, state, zip, country } = formdata;

    if (firstname === "") {
      setFrontendError("Please fill out first name");
      return;
    } else if (lastname === "") {
      setFrontendError("Please fill out last name");
      return;
    } else if (address1 === "") {
      setFrontendError("Please fill out address 1");
      return;
    } else if (city === "") {
      setFrontendError("Please fill out city");
      return;
    } else if (state === "") {
      setFrontendError("Please fill out state");
      return;
    } else if (zip === "") {
      setFrontendError("Please fill out 5 digit Zip Code");
      return;
    } else if (country === "") {
      setFrontendError("Please fill out country");
      return;
    }

    setIsLoading(true);

    fetch("http://localhost:3001/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
    })
      .then(response => response.json())
      .then((response) => {
        if (response.errors) {
          setBackendError(response.errors);
          throw Error(response.statusText);
        }
        return response;
      })
      .then(data => data['LAST_INSERT_ID()'] && history.push(`/submissions/${data['LAST_INSERT_ID()']}`))
      .then(() => setIsLoading(false))
      .catch(error => {
        setFrontendError("Server is down, contact admin");
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <p>Loading</p>
    )
  }

  return (
    <div className="Form">
      <header className="Form-header">
        <h1>
          Registration
        </h1>
      </header>
      <form onSubmit={onSubmit} className="Form-container">
        <div className="Input-container">
          <label>First Name</label>
          <input value={formdata.firstname} onChange={(event) => updateFormInput("firstname", event)} />
        </div>
        <div className="Input-container">
          <label>Last Name</label>
          <input value={formdata.lastname} onChange={(event) => updateFormInput("lastname", event)} />
        </div>
        <div className="Input-container">
          <label>Address 1</label>
          <input value={formdata.address1} onChange={(event) => updateFormInput("address1", event)} />
        </div>
        <div className="Input-container">
          <label>Address 2</label>
          <input value={formdata.address2} onChange={(event) => updateFormInput("address2", event)} />
        </div>
        <div className="Input-container">
          <label>City</label>
          <input value={formdata.city} onChange={(event) => updateFormInput("city", event)} />
        </div>
        <div className="Input-container">
          <label>State</label>
          <select value={formdata.state} onChange={(event) => updateFormSelect("state", event)}>
            {states.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <div className="Input-container">
          <label>Zip</label>
          <input value={formdata.zip} onChange={(event) => updateFormInput("zip", event)} />
        </div>
        <div className="Input-container">
          <label>Country</label>
          <select value={formdata.country} onChange={(event) => updateFormSelect("country", event)}>
            {countries.map((country) => <option key={country} value={country}>{country}</option>)}
          </select>
        </div>
        {frontendError !== null &&
          <p>
            {frontendError}
          </p>}
        {/* If the backend has an issue, but the frontend doesn't, then we display the backend issues */}
        {frontendError === null && backendError !== null &&
          backendError.map(({ msg, param }) =>
            <p>
              {param}: {msg}
            </p>
          )}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SubmissionForm;
