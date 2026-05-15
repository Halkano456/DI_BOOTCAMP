// TaskContext.js
const initialState = {
  tasks: [],
  filter: 'all', // 'all', 'completed', 'active'
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, text: action.payload.text } : task
        ),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}
const TaskItem = ({ task }) => {
  const { dispatch } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef(null);

  const handleSave = () => {
    dispatch({
      type: 'EDIT_TASK',
      payload: { id: task.id, text: editRef.current.value }
    });
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input defaultValue={task.text} ref={editRef} autoFocus />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span 
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
          >
            {task.text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </li>
  );
};const FilterControls = () => {
  const { state, dispatch } = useContext(TaskContext);

  return (
    <div className="filter-buttons">
      {['all', 'active', 'completed'].map((f) => (
        <button 
          key={f}
          className={state.filter === f ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};
const TaskList = () => {
  const { state } = useContext(TaskContext);
  
  const filteredTasks = state.tasks.filter(task => {
    if (state.filter === 'completed') return task.completed;
    if (state.filter === 'active') return !task.completed;
    return true; // 'all'
  });

  return (
    <div>
      <FilterControls />
      <ul>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};