// src/components/auth/AuthForm.jsx
export default function AuthForm({
  authMode,
  setAuthMode,
  authLoading,
  authError,
  onLogin,
  onRegister,
  isDark,
}) {
  const cardBg = isDark ? "#111827" : "#ffffff";
  const borderColor = isDark ? "#374151" : "#e5e7eb";
  const subTextColor = isDark ? "#9ca3af" : "#6b7280";
  const inputBg = isDark ? "#020617" : "#ffffff";
  const textColor = isDark ? "#e5e7eb" : "#111827";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    if (authMode === "login") {
      onLogin(email, password);
    } else {
      onRegister(name, email, password);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        background: cardBg,
        padding: "24px 20px 28px",
        borderRadius: "16px",
        boxShadow: "0 12px 35px rgba(15, 23, 42, 0.25)",
        border: `1px solid ${borderColor}`,
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "4px",
          fontSize: "24px",
        }}
      >
        📝 Todo App
      </h1>
      <p
        style={{
          textAlign: "center",
          marginTop: 0,
          marginBottom: "16px",
          fontSize: "13px",
          color: subTextColor,
        }}
      >
        {authMode === "login"
          ? "Login to manage your todos"
          : "Create an account to start using the app"}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {authMode === "register" && (
          <input
            name="name"
            type="text"
            placeholder="Name"
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: `1px solid ${borderColor}`,
              background: inputBg,
              color: textColor,
              fontSize: "14px",
            }}
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          style={{
            padding: "8px 10px",
            borderRadius: "8px",
            border: `1px solid ${borderColor}`,
            background: inputBg,
            color: textColor,
            fontSize: "14px",
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          style={{
            padding: "8px 10px",
            borderRadius: "8px",
            border: `1px solid ${borderColor}`,
            background: inputBg,
            color: textColor,
            fontSize: "14px",
          }}
        />

        {authError && (
          <p
            style={{
              color: "#f97373",
              fontSize: "13px",
              margin: 0,
              textAlign: "center",
            }}
          >
            {authError}
          </p>
        )}

        <button
          type="submit"
          disabled={authLoading}
          style={{
            marginTop: "4px",
            padding: "8px 10px",
            borderRadius: "999px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: authLoading ? "not-allowed" : "pointer",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {authLoading
            ? "Please wait..."
            : authMode === "login"
            ? "Login"
            : "Register"}
        </button>
      </form>

      <p
        style={{
          marginTop: "14px",
          fontSize: "13px",
          textAlign: "center",
          color: subTextColor,
        }}
      >
        {authMode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => authMode !== "register" && setAuthMode("register")}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => authMode !== "login" && setAuthMode("login")}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}
