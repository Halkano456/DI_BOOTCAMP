import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

// 2. Create a Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useTheme = () => useContext(ThemeContext);
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import './App.css';

const ThemeContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <h1>Current Theme: {theme.toUpperCase()}</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContent />
    </ThemeProvider>
  );
}
import React, { useRef, useState } from 'react';

const CharacterCounter = () => {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleInputChange = () => {
    // Accessing the DOM element directly via the ref
    const length = inputRef.current.value.length;
    setCount(length);
  };export const initialState = {
  tasks: [],
  filter: 'all' // Options: 'all', 'active', 'completed'
};

export function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state, action.payload] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t)
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.id ? { ...t, text: action.payload.text } : t
        )
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Character Counter</h2>
      <textarea
        ref={inputRef}
        onInput={handleInputChange}
        placeholder="Type something..."
        rows="5"
        style={{ width: '300px', padding: '10px' }}
      />
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        Character Count: <span style={{ color: 'blue' }}>{count}</span>
      </p>
    </div>
  );
};

export default CharacterCounter;
