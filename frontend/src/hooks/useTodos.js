// src/hooks/useTodos.js
import { useEffect, useState } from "react";
import * as todoApi from "../api/todos";

export function useTodos(token) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    if (!token) {
      setTodos([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await todoApi.getTodos(token);
      setTodos(data);
    } catch (err) {
      console.error("Fetch todos error:", err);
      setError(err.message || "Could not load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [token]);

  const addTodo = async (title) => {
    if (!token) return;
    try {
      setError("");
      const saved = await todoApi.createTodo(title, token);
      setTodos((prev) => [saved, ...prev]);
    } catch (err) {
      console.error("Add todo error:", err);
      setError(err.message || "Could not add todo");
    }
  };

  const toggleComplete = async (todo) => {
    if (!token) return;
    try {
      setError("");
      await todoApi.updateTodo(
        todo._id,
        { completed: !todo.completed },
        token
      );
      await fetchTodos();
    } catch (err) {
      console.error("Toggle complete error:", err);
      setError(err.message || "Could not update todo");
    }
  };

  const updateTitle = async (todo, newTitle) => {
    if (!token) return;
    try {
      setError("");
      await todoApi.updateTodo(todo._id, { title: newTitle }, token);
      await fetchTodos();
    } catch (err) {
      console.error("Update title error:", err);
      setError(err.message || "Could not save changes");
    }
  };

  const deleteTodo = async (id) => {
    if (!token) return;
    try {
      setError("");
      await todoApi.deleteTodo(id, token);
      await fetchTodos();
    } catch (err) {
      console.error("Delete todo error:", err);
      setError(err.message || "Could not delete todo");
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleComplete,
    updateTitle,
    deleteTodo,
    refetch: fetchTodos,
  };
}
