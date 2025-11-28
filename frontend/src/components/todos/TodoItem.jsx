// src/components/todos/TodoItem.jsx
export default function TodoItem({
  todo,
  borderColor,
  isDark,
  inputBg,
  textColor,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  isEditing,
  editingTitle,
  setEditingTitle,
  isSavingEdit,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "8px",
        padding: "8px 10px",
        borderRadius: "10px",
        border: `1px solid ${borderColor}`,
        background: todo.completed
          ? isDark
            ? "#064e3b"
            : "#dcfce7"
          : isDark
          ? "#020617"
          : "#ffffff",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "1 1 160px", minWidth: 0 }}>
        {isEditing ? (
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "6px 8px",
              borderRadius: "6px",
              border: `1px solid ${borderColor}`,
              background: inputBg,
              color: textColor,
              fontSize: "14px",
            }}
          />
        ) : (
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              fontSize: "14px",
              wordBreak: "break-word",
            }}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "6px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        {isEditing ? (
          <>
            <button
              onClick={onSaveEdit}
              disabled={isSavingEdit || !editingTitle.trim()}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#22c55e",
                color: "white",
                cursor: isSavingEdit ? "not-allowed" : "pointer",
              }}
            >
              {isSavingEdit ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onCancelEdit}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#6b7280",
                color: "white",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onToggle}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#10b981",
                color: "white",
                cursor: "pointer",
              }}
            >
              {todo.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={onStartEdit}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#6366f1",
                color: "white",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#ef4444",
                color: "white",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
