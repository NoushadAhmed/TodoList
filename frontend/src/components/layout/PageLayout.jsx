// src/components/layout/PageLayout.jsx
export default function PageLayout({ isDark, setIsDark, children }) {
  const pageBg = isDark ? "#0f172a" : "#e5e7eb";
  const textColor = isDark ? "#e5e7eb" : "#111827";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: pageBg,
        color: textColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 12px",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
