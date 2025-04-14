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

  const handleNewTodo = useCallback(() => {
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
  return { todos: sortedTodos, ref, handleNewTodo };
}

function App() {
  const { todos, ref, handleNewTodo } = useTodos();

  return (
    <>
      <h1>Todo List</h1>

      <div className="new-todo-input">
        <input type="text" placeholder="Add new todo item" ref={ref} />
        <button onClick={handleNewTodo}>Add Todo</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id}>{todo.task}</Todo>
        ))}
      </ul>
    </>
  );
}

export default App;
