// Action Types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

// Action Creators
export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(), // Simple unique ID
    text,
    completed: false
  }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id
});
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actions';

const initialState = {
  todos: []
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
      
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload 
            ? { ...todo, completed: !todo.completed } 
            : todo
        )
      };
      
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
      
    default:
      return state;
  }
};
import { legacy_createStore as createStore } from 'redux';
import { todoReducer } from './reducers';

// The second argument enables the Redux DevTools browser extension if installed
const store = createStore(
  todoReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        style={{ padding: '8px', marginRight: '8px', width: '250px' }}
      />
      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Add Todo
      </button>
    </form>
  );
};

// Map action creators to props
const mapDispatchToProps = {
  addTodo
};

export default connect(null, mapDispatchToProps)(TodoForm);
import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, removeTodo } from '../redux/actions';

const TodoList = ({ todos, toggleTodo, removeTodo }) => {
  if (todos.length === 0) {
    return <p style={{ color: '#666' }}>No tasks yet. Add one above!</p>;
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0, width: '350px', margin: '0 auto' }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            display: 'flex',
            justifyContent: 'between',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #eee',
            justifyContent: 'space-between'
          }}
        >
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#aaa' : '#000',
              cursor: 'pointer',
              flexGrow: 1,
              textAlign: 'left'
            }}
          >
            {todo.text}
          </span>
          <button
            onClick={() => removeTodo(todo.id)}
            style={{
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

// Map state properties to props
const mapStateToProps = (state) => ({
  todos: state.todos
});

// Map action creators to props
const mapDispatchToProps = {
  toggleTodo,
  removeTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', marginTop: '50px' }}>
      <h2>📝 Redux Todo List</h2>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);