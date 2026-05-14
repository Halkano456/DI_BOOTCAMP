const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// GET request
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello From Express" });
});

// POST request
app.post("/api/world", (req, res) => {
  console.log(req.body);

  res.send({
    message: `I received your POST request. This is what you sent me: ${req.body.input}`
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import React, { Component } from "react";

class App extends Component {
  state = {
    message: "",
    input: "",
    responseMessage: ""
  };

  // Fetch GET request
  async componentDidMount() {
    const response = await fetch("http://localhost:5000/api/hello");
    const data = await response.json();

    this.setState({ message: data.message });
  }

  // Handle input
  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  // Handle form submit
  handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: this.state.input
      })
    });

    const data = await response.json();

    this.setState({
      responseMessage: data.message
    });
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h1>{this.state.message}</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Type something..."
          />

          <button type="submit">Submit</button>
        </form>

        <p>{this.state.responseMessage}</p>
      </div>
    );
  }
}

export default App;
