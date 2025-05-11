import { fetchData } from "./main.js";

if (document.getElementById("register-form") !== null) {
  let registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", register);
}
if (document.getElementById("login-form") !== null) {
  let loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", login);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function setCurrentUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function removeCurrentUser() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

function register(e) {
  e.preventDefault();

  let errorSection = document.getElementById("error");

  const user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
  };

  fetchData("/users/register", user, "POST")
    .then((data) => {
      if (!data.message) {
        setCurrentUser(data);
        window.location.href = "note.html";
      }
    })
    .catch((err) => {
      errorSection.innerText = `${err.message}`;
    });
}

function login(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let errorSection = document.getElementById("error-section");
  let userInfo = document.getElementById("user-info");

  if (validString(username) || validString(password)) {
    userInfo.innerHTML = ``;
    errorSection.innerHTML = `Please enter a valid username and password!!!`;
  } else {
    errorSection.innerHTML = "";

    const user = {
      username: username,
      password: password,
    };

    fetchData("/users/login", user, "POST")
      .then((data) => {
        if (!data.message) {
          setCurrentUser(data);
          window.location.href = "note.html";
        }
      })
      .catch((err) => {
        errorSection.innerText = `${err.message}`;
      });
  }
}

if (document.getElementById("edit-form") !== null) {
  const input = document.getElementById("edit-form");

  const user = getCurrentUser();

  input.innerHTML = `
  <h1 class="login-logo">Edit Account</h1>
    <div class="input-boxes">
      <input type="text" id="username" placeholder="${user.username}"><br><br>

      <input type="submit" id="submit" value="Submit"></input>
    </div>
`;

  const editForm = document.getElementById("edit-form");
  if (editForm) editForm.addEventListener("submit", editUsername);

  function editUsername(e) {
    e.preventDefault();

    user.username = document.getElementById("username").value;

    fetchData("/users/update", user, "PUT")
      .then((data) => {
        removeCurrentUser();
        setCurrentUser(data);
      })
      .catch((err) => {
        errorSection.innerText = `${err.message}`;
      });
  }
}

function validString(str) {
  return str == "";
}

export { getCurrentUser, setCurrentUser, removeCurrentUser };
