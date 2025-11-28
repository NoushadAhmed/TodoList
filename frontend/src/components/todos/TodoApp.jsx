// src/components/todos/TodoApp.jsx
import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";

export default function TodoApp({
  user,
  isDark,
  setIsDark,
  todos,
  loading,
  error,
  addTodo,
  toggleComplete,
  updateTitle,
  deleteTodo,
}) {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;

  const cardBg = isDark ? "#111827" : "#ffffff";
  const textColor = isDark ? "#e5e7eb" : "#111827";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const borderColor = isDark ? "#374151" : "#e5e7eb";
  const inputBg = isDark ? "#020617" : "#ffffff";

  const handleAdd = async (t) => {
    await addTodo(t);
  };

  const handleStartEdit = (todo) => {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleSaveEdit = async (todo) => {
    if (!editingTitle.trim()) return;
    try {
      setIsSavingEdit(true);
      await updateTitle(todo, editingTitle.trim());
      setEditingId(null);
      setEditingTitle("");
    } finally {
      setIsSavingEdit(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "640px",
        margin: "0 auto",
        background: cardBg,
        padding: "20px 18px 28px",
        borderRadius: "18px",
        boxShadow: "0 12px 35px rgba(15, 23, 42, 0.25)",
        border: `1px solid ${borderColor}`,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "24px",
            margin: 0,
          }}
        >
          <span style={{ fontSize: "28px" }}>📝</span>
          <span>Todo List</span>
        </h1>

        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: subTextColor,
              whiteSpace: "nowrap",
            }}
          >
            {user?.name || user?.email}
          </span>

          <button
            onClick={() => setIsDark((prev) => !prev)}
            style={{
              padding: "6px 10px",
              borderRadius: "999px",
              border: "1px solid #4b5563",
              background: isDark ? "#111827" : "#e5e7eb",
              color: isDark ? "#e5e7eb" : "#111827",
              cursor: "pointer",
              fontSize: "12px",
              whiteSpace: "nowrap",
            }}
          >
            {isDark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* Counters */}
      <p
        style={{
          marginTop: 0,
          marginBottom: "16px",
          fontSize: "13px",
          color: subTextColor,
        }}
      >
        {totalCount === 0
          ? "No tasks yet."
          : `${completedCount} of ${totalCount} tasks completed`}
      </p>

      {/* Add form */}
      <TodoForm
        title={title}
        setTitle={setTitle}
        onAdd={handleAdd}
        isAdding={false}
        isDark={isDark}
        borderColor={borderColor}
        inputBg={inputBg}
        textColor={textColor}
      />

      {/* Filters */}
      <TodoFilters
        filter={filter}
        setFilter={setFilter}
        borderColor={borderColor}
        isDark={isDark}
        subTextColor={subTextColor}
      />

      {/* List */}
      <TodoList
        todos={todos}
        filter={filter}
        borderColor={borderColor}
        isDark={isDark}
        inputBg={inputBg}
        textColor={textColor}
        loading={loading}
        error={error}
        onToggle={toggleComplete}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        onDelete={deleteTodo}
        editingId={editingId}
        editingTitle={editingTitle}
        setEditingTitle={setEditingTitle}
        isSavingEdit={isSavingEdit}
        subTextColor={subTextColor}
      />
    </div>
  );
}
