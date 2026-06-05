import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}, // Normalized state (id -> task) for O(1) lookups
  allIds: []
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { id, title, categoryId } = action.payload;
      state.items[id] = { id, title, categoryId, completed: false, progress: 0 };
      state.allIds.push(id);
    },
    editTask: (state, action) => {
      const { id, title } = action.payload;
      if (state.items[id]) {
        state.items[id].title = title;
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.allIds = state.allIds.filter(taskId => taskId !== id);
    },
    updateTaskProgress: (state, action) => {
      const { id, progress } = action.payload;
      if (state.items[id]) {
        state.items[id].progress = progress;
        state.items[id].completed = progress === 100;
      }
    }
  }
});

export const { addTask, editTask, deleteTask, updateTaskProgress } = tasksSlice.actions;
export default tasksSlice.reducer;
import { createSelector } from '@reduxjs/toolkit';

// Base inputs
const selectTasksItems = (state) => state.tasks.items;
const selectTasksIds = (state) => state.tasks.allIds;
const selectCategoriesItems = (state) => state.categories.items;
export const selectSelectedCategoryId = (state) => state.categories.selectedCategoryId;

// Memoized: Get all tasks as an array
const selectAllTasks = createSelector(
  [selectTasksItems, selectTasksIds],
  (items, ids) => ids.map(id => items[id])
);

// 1. selectTasksByCategory
export const selectTasksByCategory = createSelector(
  [selectAllTasks, selectSelectedCategoryId],
  (tasks, selectedCategoryId) => {
    if (!selectedCategoryId) return tasks;
    return tasks.filter(task => task.categoryId === selectedCategoryId);
  }
);

// 2. selectCompletedTasks (Computes count of completed tasks)
export const selectCompletedTasksCount = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter(task => task.completed).length
);

// 3. selectCategoryById (Dynamic factory selector to accept arguments)
export const selectCategoryById = (categoryId) => createSelector(
  [selectCategoriesItems],
  (categories) => categories[categoryId] || null
);

// Get all categories for the dropdown
export const selectAllCategories = createSelector(
  [selectCategoriesItems, (state) => state.categories.allIds],
  (items, ids) => ids.map(id => items[id])
);
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCategories, selectSelectedCategoryId, selectCategory } from '../store/selectors';

export const CategorySelector = React.memo(() => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const selectedCategoryId = useSelector(selectSelectedCategoryId);

  // useCallback prevents re-creating the handler on every render
  const handleCategoryChange = useCallback((e) => {
    dispatch(selectCategory(e.target.value || null));
  }, [dispatch]);

  return (
    <div className="category-selector">
      <label htmlFor="category-select">Filter by Category: </label>
      <select 
        id="category-select" 
        value={selectedCategoryId || ''} 
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
});

CategorySelector.displayName = 'CategorySelector';
import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasksByCategory } from '../store/selectors';
import { editTask, updateTaskProgress, deleteTask } from '../store/tasksSlice';

// Isolated, Memoized Task Item Component
const TaskItem = React.memo(({ task, onEdit, onProgressUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    onEdit(task.id, editTitle);
    setIsEditing(false);
  };

  return (
    <li className="task-item" style={{ margin: '10px 0', listStyle: 'none' }}>
      {isEditing ? (
        <>
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title} ({task.progress}%)
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <input 
        type="range" 
        min="0" 
        max="100" 
        value={task.progress} 
        onChange={(e) => onProgressUpdate(task.id, Number(e.target.value))}
      />

      <button onClick={() => onProgressUpdate(task.id, task.completed ? 0 : 100)}>
        {task.completed ? 'Mark Incomplete' : 'Complete Task'}
      </button>

      <button onClick={() => onDelete(task.id)} style={{ color: 'red' }}>Delete</button>
    </li>
  );
});

TaskItem.displayName = 'TaskItem';

// Main TaskList Component
export const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasksByCategory);

  // useCallback keeps these references stable across renders
  const handleEditTask = useCallback((id, title) => {
    dispatch(editTask({ id, title }));
  }, [dispatch]);

  const handleProgressUpdate = useCallback((id, progress) => {
    dispatch(updateTaskProgress({ id, progress }));
  }, [dispatch]);

  const handleDeleteTask = useCallback((id) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  return (
    <div className="task-list-container">
      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found for this category.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onProgressUpdate={handleProgressUpdate}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
};