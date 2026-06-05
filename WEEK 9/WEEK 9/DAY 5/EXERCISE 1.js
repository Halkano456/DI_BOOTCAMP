import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit';

// 1. Define Initial State with Mock Data
const initialState = {
  books: [
    { id: 1, title: "The Shining", author: "Stephen King", genre: "Horror" },
    { id: 2, title: "Dracula", author: "Bram Stoker", genre: "Horror" },
    { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
    { id: 4, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy" },
    { id: 5, title: "Dune", author: "Frank Herbert", genre: "Science Fiction" },
    { id: 6, title: "Neuromancer", author: "William Gibson", genre: "Science Fiction" },
  ],
};

// 2. Create the Inventory Slice
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // We are only reading data for this exercise, but you could add actions here later
  },
});

// 3. Selectors Creation
// Base selector to get the entire books array
export const selectBooks = (state) => state.inventory.books;

// Memoized selector for Horror
export const selectHorrorBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Horror')
);

// Memoized selector for Fantasy
export const selectFantasyBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Fantasy')
);

// Memoized selector for Science Fiction
export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter(book => book.genre === 'Science Fiction')
);

// 4. Configure Store
export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
  },
});
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  selectBooks, 
  selectHorrorBooks, 
  selectFantasyBooks, 
  selectScienceFictionBooks 
} from './store';

export default function BookList() {
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Determine which selector to use based on the dropdown/UI state
  const getSelectedBooks = () => {
    switch (selectedGenre) {
      case 'Horror':
        return selectHorrorBooks;
      case 'Fantasy':
        return selectFantasyBooks;
      case 'Science Fiction':
        return selectScienceFictionBooks;
      case 'All':
      default:
        return selectBooks;
    }
  };

  // Extract the filtered books from the Redux store
  const filteredBooks = useSelector(getSelectedBooks());

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px' }}>
      <h2>📚 Book Inventory</h2>
      
      {/* UI Interaction: Dropdown to switch genres */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="genre-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Filter by Genre:
        </label>
        <select 
          id="genre-select"
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="All">All Genres</option>
          <option value="Horror">Horror</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>
      </div>

      {/* Dynamic Book List Display */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li 
              key={book.id} 
              style={{ 
                padding: '10px', 
                borderBottom: '1px solid #eee',
                backgroundColor: '#f9f9f9',
                marginBottom: '5px',
                borderRadius: '4px'
              }}
            >
              <strong>{book.title}</strong> by {book.author} 
              <span style={{ 
                float: 'right', 
                fontSize: '0.85em', 
                backgroundColor: '#e0e0e0', 
                padding: '2px 6px', 
                borderRadius: '10px' 
              }}>
                {book.genre}
              </span>
            </li>
          ))
        ) : (
          <p>No books available for this genre.</p>
        )}
      </ul>
    </div>
  );
}
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import BookList from './BookList';

function App() {
  return (
    <Provider store={store}>
      <BookList />
    </Provider>
  );
}

export default App;