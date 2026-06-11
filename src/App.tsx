import { useState } from "react";
import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  function addTodo(title: string) {
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    }
    setTodos([...todos, newTodo])
    setText("")
  }
  console.log(todos)
  return (
    <div>
      <div>
        <h1>Todo App</h1>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Todo"
        />
        <button onClick={() => addTodo(text)}>Add</button>
      </div>
    </div>
  );
}

export default App;