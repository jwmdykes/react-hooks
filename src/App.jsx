import {
  useState,
  useRef,
  useEffect,
  useId,
  useMemo,
  useCallback,
} from 'react';

function Todo({ children, ...props }) {
  const id = useId();

  return (
    <li>
      <input type="checkbox" id={id} {...props} />
      <label htmlFor={id}>{children}</label>
    </li>
  );
}

function useTodos() {
  const [todos, setTodos] = useState([]);
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  }, []);

  useEffect(() => {
    async function fetchInitialTodos() {
      const response = await fetch(
        'https://todos-api.98johndykes.workers.dev/'
      );
      setTodos(await response.json());
    }

    fetchInitialTodos();
  }, []);

  function toggleTodo(id) {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        } else {
          return todo;
        }
      });

      return newTodos;
    });
  }

  const addTodo = useCallback(() => {
    setTodos((todos) => [
      ...todos,
      {
        id: todos.length + 1,
        task: ref.current.value,
        isComplete: false,
      },
    ]);
  }, []);

  const sortedTodos = useMemo(
    () => todos.toSorted((a, b) => a.task.localeCompare(b.task)),
    [todos]
  );

  return { todos: sortedTodos, ref, addTodo, toggleTodo };
}

function App() {
  const { todos, ref, addTodo, toggleTodo } = useTodos();

  return (
    <>
      <h1>To Do List</h1>

      <div className="new-todo-input">
        <input type="text" placeholder="Add new to do item" ref={ref} />
        <button onClick={addTodo}>Add New</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            checked={todo.isComplete}
            onChange={() => toggleTodo(todo.id)}
          >
            {todo.task}
          </Todo>
        ))}
      </ul>
    </>
  );
}

export default App;
