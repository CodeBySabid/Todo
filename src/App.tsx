import React, { useEffect, useState } from "react";
import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  function addTodo(title: string) {
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    }
    setTodos(prev => [...prev, newTodo]);
    setText("")
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )
    );
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTodo(text);
    }
  }


  function deleteTodo(id: number) {
    setTodos(
      todos.filter((todo) => todo.id !== id)
    );
  }

  return (
    <div className="w-screen min-h-screen bg-linear-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80 flex justify-center items-center flex-col">
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-[95%] max-w-md">
        <div>
          <h1 className="text-center border-2 text-2xl sm:text-3xl lg:text-5xl font-bold rounded-xl  border-blue-800 pb-2">Todo App</h1>
          <div className="w-full">
            <input
              className="flex-1 w-[80%] px-4 mt-2 py-1.5 rounded-l-xl outline-none border text-lg"
              onKeyDown={handleKeyDown}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter Todo"
            />
            <button className="px-5 py-2 text-lg bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition" onClick={() => addTodo(text)}>
              Add
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <p>{todos.length <= 0 ? <div className="text-center text-gray-500">
            No Todos Yet 🚀
          </div> : `Total Todos ${todos.length}`}</p>
          <p>Pending: {todos.filter(todo => !todo.completed).length}</p>
          <p>completed: {todos.filter(todo => todo.completed).length}</p>
        </div>
        <div>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white px-3 py-2 rounded-xl shadow flex justify-between items-center mt-2">
              <span
                className={
                  todo.completed
                    ? "line-through text-gray-500"
                    : ""
                }
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.title}
              </span>
              <div className="flex gap-2">
                {todo.completed ? "Completed" : "Pending"}
                <button
                  className={`px-3 py-1 rounded-lg text-white ${todo.completed ? "bg-red-500" : "bg-orange-500"}`}
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="bg-red-600 rounded-sm mt-2 px-4 py-1" onClick={() => { setTodos([]) }}>Clear All</button>
      </div>
    </div>
  );
}

export default App;