const BACKEND_URL = "https://bookish-yodel-7vwxqj5vrjw62r45g-3001.app.github.dev/";

export async function signup(email, password) {
  const res = await fetch(`${BACKEND_URL}api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BACKEND_URL}api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function validateToken(token) {
  const res = await fetch(`${BACKEND_URL}api/validate`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}