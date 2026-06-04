 import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    { id: 1, text: 'Learn Redux Toolkit', completed: false },
    { id: 2, text: 'Build a Todo App', completed: true },
  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // action.payload will be the string text of the todo
      state.todos.push({
        id: Date.now(), // simple unique ID
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      // action.payload will be the id of the todo
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      // action.payload will be the id of the todo
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    todoManager: todoReducer, // 'todoManager' will be our key in useSelector
  },
});
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todoSlice';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    dispatch(addTodo(text));
    setText(''); // Clear input
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '8px', marginRight: '8px', width: '250px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>Add Todo</button>
    </form>
  );
}
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from './todoSlice';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '8px', 
      borderBottom: '1px solid #eee',
      maxWidth: '350px'
    }}>
      <span 
        onClick={() => dispatch(toggleTodo(todo.id))}
        style={{ 
          textDecoration: todo.completed ? 'line-through' : 'none', 
          cursor: 'pointer',
          color: todo.completed ? '#888' : '#000'
        }}
      >
        {todo.text}
      </span>
      <button 
        onClick={() => dispatch(removeTodo(todo.id))}
        style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
      >
        Delete
      </button>
    </li>
  );
}
import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

export default function TodoList() {
  // Accessing the 'todos' array inside our configured 'todoManager' slice
  const todos = useSelector((state) => state.todoManager.todos);

  return (
    <div>
      <h3>Your Tasks</h3>
      {todos.length === 0 ? (
        <p>No tasks left! 🎉</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🌟 Redux Toolkit Todo List</h2>
      <AddTodo />
      <TodoList />
    </div>
  );
}

// Rendering the App wrapped in the Redux Provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);