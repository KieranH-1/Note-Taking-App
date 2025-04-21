

if (document.getElementById("register-form") !==  null){
  let registerForm = document.getElementById("register-form");
registerForm.addEventListener('submit', register);
}

if (document.getElementById("login-form") !==  null){
let loginForm = document.getElementById("login-form");
loginForm.addEventListener('submit', login);
}

function register(e) {
  e.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let email = document.getElementById('email').value;
  let errorSection = document.getElementById("error-section");
  let userInfo = document.getElementById("user-info");

  if (validString(username) || validString(password) || validString(email)) {
    userInfo.innerHTML = ``;
    errorSection.innerHTML = `Please enter a valid username, email, and/ password!!!`;
  } else {
    errorSection.innerHTML = "";
    const user = new User(0,
      username,
      password,
      email
    );

    userInfo.innerHTML = `Welcome ${user.getUserName} of email ${user.get}`;

    console.log(user);
  }

  username.value = "";
  password.value = "";
  email.value = "";
}

function login(e) {
  e.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let errorSection = document.getElementById("error-section");
  let userInfo = document.getElementById("user-info");

  if (validString(username) || validString(password)) {
    userInfo.innerHTML = ``;
    errorSection.innerHTML = `Please enter a valid username and password!!!`;
  } else {
    errorSection.innerHTML = "";
    const user = new User(
      0,
      username,
      password,
      null
    );

    userInfo.innerHTML = `Welcome ${user.username}`;

    console.log(user);
  }

  username.value = "";
  password.value = "";
}

function validString(str) {
  return str == "";
}

class User {
  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  getUserName() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  setUserName(username) {
    this.username = username;
  }

  setPassword(password) {
    this.password = password;
  }

  setEmail(email) {
    this.email = email;
  }
}