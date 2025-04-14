import { useState, useRef, useEffect } from 'react';

function Todo({ children, ...props }) {
  return (
    <div>
      <input type="checkbox" id="todo" {...props} />
      <label htmlFor="todo">{children}</label>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const ref = useRef();
  useEffect(() => {
    async function fetchInitialTodos() {
      const response = await fetch(
        'https://todos-api.98johndykes.workers.dev/'
      );
      setTodos(await response.json());
    }

    fetchInitialTodos();
  }, []);

  function handleNewTodo() {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        task: ref.current.value,
        isComplete: false,
      },
    ]);
  }

  return (
    <>
      <h1>Todo List</h1>

      <div className="new-todo-input">
        <input type="text" placeholder="Add new todo item" ref={ref} />
        <button onClick={handleNewTodo}>Add Todo</button>
      </div>

      <div className="todo-container">
        {todos.map((todo) => (
          <Todo key={todo.id}>{todo.task}</Todo>
        ))}
      </div>
    </>
  );
}

export default App;
