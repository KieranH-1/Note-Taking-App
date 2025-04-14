let loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", login);

function login(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let errorSection = document.getElementById("errorSection");

  if (!validString(username) || !validString(password)) {
    errorSection.innerHTML = "Please enter a valid username and password";
  } else {
    errorSection.innerHTML = "";
    const user = {
      username: username,
      password: password,
    };

    let userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = `Welcome ${user.username}`;

    console.log(user);
  }

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function validString(str) {
  return str == "";
}
