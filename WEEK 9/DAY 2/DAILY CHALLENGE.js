import { createSlice } from '@reduxjs/toolkit';

// Helper to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('plannerTasks');
    return serializedState ? JSON.parse(serializedState) : {};
  } catch (err) {
    return {};
  }
};

const initialState = {
  tasksByDay: loadState(), // Structure: { "YYYY-MM-DD": [ { id, text, completed }, ... ] }
  selectedDate: new Date().toISOString().split('T')[0], // Defaults to today
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addTask: (state, action) => {
      const { date, text } = action.payload;
      if (!state.tasksByDay[date]) {
        state.tasksByDay[date] = [];
      }
      state.tasksByDay[date].push({
        id: Date.now().toString(),
        text,
        completed: false,
      });
      localStorage.setItem('plannerTasks', JSON.stringify(state.tasksByDay));
    },
    editTask: (state, action) => {
      const { date, taskId, updatedText } = action.payload;
      const dayTasks = state.tasksByDay[date];
      if (dayTasks) {
        const task = dayTasks.find((t) => t.id === taskId);
        if (task) {
          task.text = updatedText;
        }
      }
      localStorage.setItem('plannerTasks', JSON.stringify(state.tasksByDay));
    },
    deleteTask: (state, action) => {
      const { date, taskId } = action.payload;
      if (state.tasksByDay[date]) {
        state.tasksByDay[date] = state.tasksByDay[date].filter((t) => t.id !== taskId);
        // Clean up empty days
        if (state.tasksByDay[date].length === 0) {
          delete state.tasksByDay[date];
        }
      }
      localStorage.setItem('plannerTasks', JSON.stringify(state.tasksByDay));
    },
    toggleTaskCompletion: (state, action) => {
      const { date, taskId } = action.payload;
      const dayTasks = state.tasksByDay[date];
      if (dayTasks) {
        const task = dayTasks.find((t) => t.id === taskId);
        if (task) task.completed = !task.completed;
      }
      localStorage.setItem('plannerTasks', JSON.stringify(state.tasksByDay));
    }
  },
});

export const { 
  setSelectedDate, 
  addTask, 
  editTask, 
  deleteTask, 
  toggleTaskCompletion 
} = plannerSlice.actions;

export default plannerSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import plannerReducer from './features/planner/plannerSlice';

export const store = configureStore({
  reducer: {
    planner: plannerReducer,
  },
});import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDate } from '../features/planner/plannerSlice';

export default function DatePicker() {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const dispatch = useDispatch();

  const handleDateChange = (e) => {
    dispatch(setSelectedDate(e.target.value));
  };

  return (
    <div style={styles.container}>
      <label htmlFor="planner-date" style={styles.label}>Select Date: </label>
      <input
        type="date"
        id="planner-date"
        value={selectedDate}
        onChange={handleDateChange}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: { margin: '20px 0', display: 'flex', alignItems: 'center', gap: '10px' },
  label: { fontWeight: 'bold', fontSize: '1.1rem' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }
};import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/planner/plannerSlice';

export default function TaskForm() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple Validation
    if (!text.trim()) {
      setError('Task descriptive text cannot be empty.');
      return;
    }

    dispatch(addTask({ date: selectedDate, text: text.trim() }));
    setText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Task</button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
}

const styles = {
  form: { margin: '20px 0' },
  inputGroup: { display: 'flex', gap: '10px' },
  input: { flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px 20px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: 'red', fontSize: '0.85rem', marginTop: '5px' }
};import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask, toggleTaskCompletion } from '../features/planner/plannerSlice';

export default function TaskItem({ task, date }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (!editText.trim()) return;
    dispatch(editTask({ date, taskId: task.id, updatedText: editText.trim() }));
    setIsEditing(false);
  };

  return (
    <li style={styles.item}>
      <div style={styles.leftContainer}>
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => dispatch(toggleTaskCompletion({ date, taskId: task.id }))}
          style={styles.checkbox}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={styles.editInput}
          />
        ) : (
          <span style={{ ...styles.text, textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
          </span>
        )}
      </div>

      <div style={styles.actions}>
        {isEditing ? (
          <>
            <button onClick={handleSave} style={styles.saveBtn}>Save</button>
            <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>Edit</button>
            <button 
              onClick={() => dispatch(deleteTask({ date, taskId: task.id }))} 
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

const styles = {
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee', gap: '10px' },
  leftContainer: { display: 'flex', alignItems: 'center', gap: '10px', flex: 1 },
  checkbox: { width: '18px', height: '18px', cursor: 'pointer' },
  text: { fontSize: '1rem', color: '#333' },
  editInput: { flex: 1, padding: '4px', fontSize: '1rem' },
  actions: { display: 'flex', gap: '5px' },
  saveBtn: { background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
  cancelBtn: { background: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
  editBtn: { background: '#ffc107', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
  deleteBtn: { background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
};
import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

export default function TaskList() {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const tasks = useSelector((state) => state.planner.tasksByDay[selectedDate] || []);

  return (
    <div style={styles.container}>
      <h3>Agenda for {selectedDate}</h3>
      {tasks.length === 0 ? (
        <p style={styles.emptyText}>No tasks planned for this day. Enjoy your free time!</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} date={selectedDate} />
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: { marginTop: '20px' },
  list: { listStyleType: 'none', padding: 0, margin: 0 },
  emptyText: { color: '#777', fontStyle: 'italic' }
};
import React from 'react';
import DatePicker from './components/DatePicker';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1>📅 Daily Planner Hub</h1>
      </header>
      <main style={styles.card}>
        <DatePicker />
        <TaskForm />
        <hr style={styles.divider} />
        <TaskList />
      </main>
    </div>
  );
}

const styles = {
  wrapper: { background: '#f4f6f9', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Arial, sans-serif' },
  header: { textAlign: 'center', marginBottom: '30px', color: '#2c3e50' },
  card: { maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  divider: { border: '0', height: '1px', background: '#e0e0e0', margin: '25px 0' }
};import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);