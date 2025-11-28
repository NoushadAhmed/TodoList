// src/components/todos/TodoFilters.jsx
export default function TodoFilters({
  filter,
  setFilter,
  borderColor,
  isDark,
  subTextColor,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "14px",
        justifyContent: "center",
        flexWrap: "wrap",
        fontSize: "13px",
      }}
    >
      {["all", "active", "completed"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            border: filter === f ? "none" : `1px solid ${borderColor}`,
            background:
              filter === f ? "#2563eb" : isDark ? "#020617" : "#ffffff",
            color: filter === f ? "white" : subTextColor,
            cursor: "pointer",
            textTransform: "capitalize",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
