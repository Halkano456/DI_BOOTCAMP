import { createSlice } from '@reduxjs/toolkit';

// Initial state holds selectedDay and a tasks object grouped by date strings
const initialState = {
  selectedDay: new Date().toISOString().split('T')[0], // Defaults to today's date (YYYY-MM-DD)
  tasksByDay: {}, // Structure: { "2026-06-04": [{ id: '1', text: 'Task' }] }
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    addTask: (state, action) => {
      const { day, text } = action.payload;
      if (!state.tasksByDay[day]) {
        state.tasksByDay[day] = [];
      }
      state.tasksByDay[day].push({
        id: Date.now().toString(), // Simple unique ID generation
        text,
      });
    },
    editTask: (state, action) => {
      const { day, id, newText } = action.payload;
      const dayTasks = state.tasksByDay[day];
      if (dayTasks) {
        const task = dayTasks.find((t) => t.id === id);
        if (task) {
          task.text = newText;
        }
      }
    },
    deleteTask: (state, action) => {
      const { day, id } = action.payload;
      if (state.tasksByDay[day]) {
        state.tasksByDay[day] = state.tasksByDay[day].filter((t) => t.id !== id);
      }
    },
  },
});

export const { setSelectedDay, addTask, editTask, deleteTask } = plannerSlice.actions;
export default plannerSlice.reducer;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDay } from '../features/plannerSlice';

export default function Calendar() {
  const selectedDay = useSelector((state) => state.planner.selectedDay);
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f9', borderRadius: '5px' }}>
      <label htmlFor="date-picker" style={{ marginRight: '10px', fontWeight: 'bold' }}>
        Select Date:{' '}
      </label>
      <input
        type="date"
        id="date-picker"
        value={selectedDay}
        onChange={(e) => dispatch(setSelectedDay(e.target.value))}
        style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
  );
}
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/plannerSlice';

export default function AddTask() {
  const [text, setText] = useState('');
  const selectedDay = useSelector((state) => state.planner.selectedDay);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(addTask({ day: selectedDay, text }));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Add Task
      </button>
    </form>
  );
}import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask } from '../features/plannerSlice';

export default function TaskItem({ task, day }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      dispatch(editTask({ day, id: task.id, newText: editText }));
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask({ day, id: task.id }));
  };

  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
      {isEditing ? (
        <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ flex: 1, padding: '4px' }}
          />
          <button onClick={handleSave} style={{ background: '#28a745', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Save</button>
          <button onClick={() => setIsEditing(false)} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Cancel</button>
        </div>
      ) : (
        <>
          <span>{task.text}</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button onClick={() => setIsEditing(true)} style={{ background: '#ffc107', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
            <button onClick={handleDelete} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}
import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

export default function TaskList() {
  const selectedDay = useSelector((state) => state.planner.selectedDay);
  // Get tasks for the selected day or default to an empty array
  const tasks = useSelector((state) => state.planner.tasksByDay[selectedDay] || []);

  return (
    <div>
      <h3>Tasks for {selectedDay}</h3>
      {tasks.length === 0 ? (
        <p style={{ color: '#777', fontStyle: 'italic' }}>No tasks scheduled for this day.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} day={selectedDay} />
          ))}
        </ul>
      )}
    </div>
  );
}
import React from 'react';
import Calendar from './components/Calendar';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2>Daily Planner Application</h2>
      <Calendar />
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);