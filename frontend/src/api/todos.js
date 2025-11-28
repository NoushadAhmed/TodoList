// src/api/todos.js
import { request } from "./client";

export function getTodos(token) {
  return request("/todos", { method: "GET" }, token);
}

export function createTodo(title, token) {
  return request(
    "/todos",
    {
      method: "POST",
      body: { title },
    },
    token
  );
}

export function updateTodo(id, data, token) {
  return request(
    `/todos/${id}`,
    {
      method: "PUT",
      body: data,
    },
    token
  );
}

export function deleteTodo(id, token) {
  return request(
    `/todos/${id}`,
    {
      method: "DELETE",
    },
    token
  );
}
