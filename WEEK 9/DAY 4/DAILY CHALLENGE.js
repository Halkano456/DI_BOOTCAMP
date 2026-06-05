# Create a new Vite project (if starting from scratch)
npm create vite@latest age-tracker -- --template react
cd age-tracker

# Install Redux Toolkit and React-Redux
npm install @reduxjs/toolkit react-redux
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper function to simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 2. Define Async Thunks
export const ageUpAsync = createAsyncThunk(
  'age/ageUpAsync',
  async (amount = 1) => {
    await delay(1000); // 1 second delay
    return amount;
  }
);

export const ageDownAsync = createAsyncThunk(
  'age/ageDownAsync',
  async (amount = 1) => {
    await delay(1000); // 1 second delay
    return amount;
  }
);

// 3. Create the Age Slice
const ageSlice = createSlice({
  name: 'age',
  initialState: {
    age: 20,
    loading: false,
  },
  reducers: {
    // Standard synchronous reducers would go here if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle Age Up Actions
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.age += action.payload;
      })
      // Handle Age Down Actions
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.age -= action.payload;
      });
  },
});

export default ageSlice.reducer;
import React from 'react';
import { useSelector } from 'react-redux';

export default function AgeDisplay() {
  const { age, loading } = useSelector((state) => state.ageManager);

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Current Age: {age}</h2>
      {loading && (
        <div className="spinner" style={spinnerStyle}>
          ⏳ Updating age...
        </div>
      )}
    </div>
  );
}

const spinnerStyle = {
  fontSize: '1.2rem',
  color: '#007bff',
  fontWeight: 'bold',
  animation: 'pulse 1s infinite alternate',
};
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ageUpAsync, ageDownAsync } from '../store/ageSlice';

export default function AgeControls() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ageManager);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', gap: '10px', display: 'flex', justifyContent: 'center' }}>
      <button 
        type="button" 
        onClick={() => dispatch(ageDownAsync(1))}
        disabled={loading}
        style={buttonStyle}
      >
        Age Down
      </button>
      <button 
        type="button" 
        onClick={() => dispatch(ageUpAsync(1))}
        disabled={loading}
        style={buttonStyle}
      >
        Age Up
      </button>
    </form>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  cursor: 'pointer',
  backgroundColor: '#f0f0f0',
  border: '1px solid #ccc',
  borderRadius: '4px'
};
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
import React from 'react';
import AgeDisplay from './components/AgeDisplay';
import AgeControls from './components/AgeControls';

function App() {
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Age Tracker</h1>
      <hr />
      <AgeDisplay />
      <AgeControls />
    </div>
  );
}

export default App;