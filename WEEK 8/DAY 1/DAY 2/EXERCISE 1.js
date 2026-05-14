import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import ErrorBoundary from "./ErrorBoundary";

const HomeScreen = () => <h1>Home</h1>;
const ProfileScreen = () => <h1>Profile</h1>;
const ShopScreen = () => {
  throw new Error("Shop Component Crashed!");
};

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
            <NavLink className="nav-link" to="/shop">Shop</NavLink>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <ErrorBoundary><HomeScreen /></ErrorBoundary>
        } />
        <Route path="/profile" element={
          <ErrorBoundary><ProfileScreen /></ErrorBoundary>
        } />
        <Route path="/shop" element={
          <ErrorBoundary><ShopScreen /></ErrorBoundary>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import posts from './data.json';

const PostList = () => {
  return (
    <div>
      <h1>Hi This is a Title</h1>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '20px' }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
import React, { Component } from 'react';
import data from './complexData.json';

// Example 1: Social Medias (Array)
export class Example1 extends Component {
  render() {
    return (
      <ul>
        {data.SocialMedias.map((link, i) => <li key={i}>{link}</li>)}
      </ul>
    );
  }
}

// Example 2: Skills (Object with inner arrays)
export class Example2 extends Component {
  render() {
    return (
      <div>
        {data.Skills.map((skillGroup, i) => (
          <div key={i}>
            <h3>{skillGroup.Area}</h3>
            <ul>
              {skillGroup.SkillSet.map((skill, j) => <li key={j}>{skill.Name}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

// Example 3: Experiences (Nested Objects)
export class Example3 extends Component {
  render() {
    return (
      <div>
        {data.Experiences.map((exp, i) => (
          <div key={i}>
            <img src={exp.logo} alt="logo" width="50" />
            <a href={exp.url}>{exp.companyName}</a>
            {exp.roles.map((role, j) => (
              <div key={j}>
                <p><strong>{role.title}</strong></p>
                <p>{role.startDate} - {role.location}</p>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
const postData = async () => {
  const url = "YOUR_WEBHOOK_URL_HERE";
  const payload = {
    key1: 'myusername',
    email: 'mymail@gmail.com',
    name: 'Isaac',
    lastname: 'Doe',
    age: 27
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

// Inside your return statement:
// <button onClick={postData}>Press to post data</button>
