import { getCurrentUser, removeCurrentUser } from "./user.js";
const nav = document.querySelector("nav");

const user = getCurrentUser();
if (user) {
  nav.innerHTML = `
    <a class="notes" href="note.html">Notes</a>
    <a class="user" href="profile.html">${user.username}</a>
    <a id="logout">Logout</a>
  `;
} else {
  nav.innerHTML = `
    <a class="register" href="register.html">Register</a>
    <a class="notes" href="note.html">Notes</a>
    <a class="login" href="login.html">Login</a>
  `;
}

// enable logout functionality
const logout = document.getElementById("logout");
if (logout) logout.addEventListener("click", removeCurrentUser);

// Fetch method implementation:
export async function fetchData(route, data, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}
