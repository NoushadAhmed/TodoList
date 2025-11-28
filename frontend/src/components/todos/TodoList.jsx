// src/components/todos/TodoList.jsx
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  filter,
  borderColor,
  isDark,
  inputBg,
  textColor,
  loading,
  error,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  editingId,
  editingTitle,
  setEditingTitle,
  isSavingEdit,
  subTextColor,
}) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (loading) {
    return (
      <p style={{ textAlign: "center", color: subTextColor }}>
        Loading todos...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "#f97373" }}>{error}</p>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <p style={{ textAlign: "center", color: subTextColor }}>
        No tasks to show.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          borderColor={borderColor}
          isDark={isDark}
          inputBg={inputBg}
          textColor={textColor}
          onToggle={() => onToggle(todo)}
          onStartEdit={() => onStartEdit(todo)}
          onSaveEdit={() => onSaveEdit(todo)}
          onCancelEdit={onCancelEdit}
          onDelete={() => onDelete(todo._id)}
          isEditing={editingId === todo._id}
          editingTitle={editingTitle}
          setEditingTitle={setEditingTitle}
          isSavingEdit={isSavingEdit}
        />
      ))}
    </div>
  );
}
