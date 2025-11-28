// src/App.jsx
import { useState } from "react";
import PageLayout from "./components/layout/PageLayout";
import AuthForm from "./components/auth/AuthForm";
import TodoApp from "./components/todos/TodoApp";
import { useAuth } from "./hooks/useAuth";
import { useTodos } from "./hooks/useTodos";

function App() {
  const [isDark, setIsDark] = useState(false);
  const {
    user,
    token,
    authMode,
    setAuthMode,
    authLoading,
    authError,
    setAuthError,
    login,
    register,
    logout,
  } = useAuth();

  const {
    todos,
    loading: todosLoading,
    error: todosError,
    addTodo,
    toggleComplete,
    updateTitle,
    deleteTodo,
  } = useTodos(token);

  // not logged-in view
  if (!user || !token) {
    return (
      <PageLayout isDark={isDark} setIsDark={setIsDark}>
        <AuthForm
          authMode={authMode}
          setAuthMode={(mode) => {
            setAuthMode(mode);
            setAuthError("");
          }}
          authLoading={authLoading}
          authError={authError}
          onLogin={login}
          onRegister={register}
          isDark={isDark}
        />
      </PageLayout>
    );
  }

  // logged-in view
  return (
    <PageLayout isDark={isDark} setIsDark={setIsDark}>
      <div style={{ position: "relative", width: "100%", maxWidth: "700px" }}>
        {/* small logout button in corner */}
        <button
          onClick={logout}
          style={{
            position: "absolute",
            top: "-32px",
            right: "0",
            padding: "6px 10px",
            borderRadius: "999px",
            border: "none",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Logout
        </button>

        <TodoApp
          user={user}
          isDark={isDark}
          setIsDark={setIsDark}
          todos={todos}
          loading={todosLoading}
          error={todosError}
          addTodo={addTodo}
          toggleComplete={toggleComplete}
          updateTitle={updateTitle}
          deleteTodo={deleteTodo}
        />
      </div>
    </PageLayout>
  );
}

export default App;
