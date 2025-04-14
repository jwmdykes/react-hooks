function Todo({ children, ...props }) {
  return (
    <div>
      <input type="checkbox" id="todo" {...props} />
      <label htmlFor="todo">{children}</label>
    </div>
  );
}

function App() {
  const todos = [
    { id: 1, task: 'Wash the dishes', isComplete: false },
    { id: 3, task: 'Do your homework', isComplete: false },
    { id: 4, task: 'Play videogames', isComplete: true },
    { id: 5, task: 'Solve world hunger', isComplete: false },
    { id: 8, task: 'Solve my hunger', isComplete: true },
  ];

  return (
    <>
      <h1>Todo List</h1>

      <div className="new-todo-input">
        <input type="text" placeholder="Add new todo item" />
        <button>Add Todo</button>
      </div>

      <div className="todo-container">
        {todos.map((todo) => (
          <Todo>{todo.task}</Todo>
        ))}
      </div>
    </>
  );
}

export default App;
