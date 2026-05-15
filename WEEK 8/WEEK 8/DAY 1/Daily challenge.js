import React, { Component } from "react";
import FormComponent from "./FormComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      destination: "",
      lactoseFree: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange using ternary operator for checkbox checked status
  handleChange(event) {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === "checkbox" ? checked : value
    });
  }

  // On submit, pass entered data in the URL
  handleSubmit(event) {
    event.preventDefault();
    
    const { firstName, lastName, age, gender, destination, lactoseFree } = this.state;
    
    // Build query string
    const params = new URLSearchParams();
    params.append("firstName", firstName);
    params.append("lastName", lastName);
    params.append("age", age);
    params.append("gender", gender);
    params.append("destination", destination);
    if (lactoseFree) {
      params.append("lactoseFree", "on");
    }
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
    
    // Optional: show alert to confirm
    alert(`Form submitted! URL updated to: ${newUrl}`);
  }

  render() {
    return (
      <FormComponent
        data={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default App;
import React from "react";

function FormComponent(props) {
  const { data, handleChange, handleSubmit } = props;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Travel Form</h2>
      
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            First Name:{" "}
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </label>
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Last Name:{" "}
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </label>
        </div>

        {/* Age */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Age:{" "}
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={handleChange}
              placeholder="25"
            />
          </label>
        </div>

        {/* Gender - Radio Buttons */}
        <div style={{ marginBottom: "10px" }}>
          <label>Gender:</label>
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={data.gender === "male"}
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={data.gender === "female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>

        {/* Destination - Select Dropdown */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Destination:{" "}
            <select
              name="destination"
              value={data.destination}
              onChange={handleChange}
            >
              <option value="">-- Please Choose a destination --</option>
              <option value="Japan">Japan</option>
              <option value="Thailand">Thailand</option>
              <option value="Brazil">Brazil</option>
              <option value="France">France</option>
            </select>
          </label>
        </div>

        {/* Dietary Restrictions - Checkbox */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="lactoseFree"
              checked={data.lactoseFree}
              onChange={handleChange}
            />{" "}
            Lactose Free
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      <hr />

      {/* Display current form values */}
      <h3>Entered Information:</h3>
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
      <p>Age: {data.age}</p>
      <p>Gender: {data.gender}</p>
      <p>Destination: {data.destination}</p>
      <p>
        Lactose Free: {data.lactoseFree ? "Yes" : "No"}
      </p>
    </div>
  );
}

export default FormComponent;
import React from "react";

function FormComponent(props) {
  const { data, handleChange, handleSubmit } = props;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Travel Form</h2>
      
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            First Name:{" "}
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </label>
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Last Name:{" "}
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </label>
        </div>

        {/* Age */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Age:{" "}
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={handleChange}
              placeholder="25"
            />
          </label>
        </div>

        {/* Gender - Radio Buttons */}
        <div style={{ marginBottom: "10px" }}>
          <label>Gender:</label>
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={data.gender === "male"}
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={data.gender === "female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>

        {/* Destination - Select Dropdown */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            Destination:{" "}
            <select
              name="destination"
              value={data.destination}
              onChange={handleChange}
            >
              <option value="">-- Please Choose a destination --</option>
              <option value="Japan">Japan</option>
              <option value="Thailand">Thailand</option>
              <option value="Brazil">Brazil</option>
              <option value="France">France</option>
            </select>
          </label>
        </div>

        {/* Dietary Restrictions - Checkbox */}
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="lactoseFree"
              checked={data.lactoseFree}
              onChange={handleChange}
            />{" "}
            Lactose Free
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      <hr />

      {/* Display current form values */}
      <h3>Entered Information:</h3>
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
      <p>Age: {data.age}</p>
      <p>Gender: {data.gender}</p>
      <p>Destination: {data.destination}</p>
      <p>
        Lactose Free: {data.lactoseFree ? "Yes" : "No"}
      </p>
    </div>
  );
}

export default FormComponent;