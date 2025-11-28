// src/components/todos/TodoForm.jsx
export default function TodoForm({
  title,
  setTitle,
  onAdd,
  isAdding,
  isDark,
  borderColor,
  inputBg,
  textColor,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "16px",
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          flex: "1 1 160px",
          minWidth: 0,
          padding: "10px 12px",
          borderRadius: "999px",
          border: `1px solid ${borderColor}`,
          outline: "none",
          fontSize: "14px",
          background: inputBg,
          color: textColor,
        }}
      />
      <button
        type="submit"
        disabled={isAdding || !title.trim()}
        style={{
          padding: "10px 18px",
          borderRadius: "999px",
          border: "none",
          background: isAdding ? "#60a5fa" : "#2563eb",
          color: "white",
          cursor: isAdding ? "not-allowed" : "pointer",
          opacity: isAdding ? 0.85 : 1,
          fontWeight: 500,
          fontSize: "14px",
          flexShrink: 0,
        }}
      >
        {isAdding ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
