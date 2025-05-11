import { getCurrentUser, removeCurrentUser, setCurrentUser } from "./user";
import { fetchData } from "./main";
const input = document.getElementById("login-form");

const user = getCurrentUser();

if (!user) window.location.href = "login.html";

input.innerHTML = `
  <h1 class="login-logo">Edit Account</h1>
    <div class="input-boxes">
      <input type="text" id="username" placeholder="${user.username}"><br><br>

      <input type="submit" id="submit" value="Submit"></input>
    </div>
`;

const editForm = document.getElementById("login-form");
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
