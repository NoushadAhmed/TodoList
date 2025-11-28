// src/api/client.js
export const BACKEND_URL = "http://localhost:5000";

export async function request(path, options = {}, token) {
  const {
    method = "GET",
    headers = {},
    body,
  } = options;

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  const finalOptions = {
    method,
    headers: finalHeaders,
  };

  if (body !== undefined) {
    finalOptions.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  if (token) {
    finalOptions.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BACKEND_URL}${path}`, finalOptions);

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new Error(data?.message || "Request failed");
    err.status = res.status;
    throw err;
  }

  return data;
}
