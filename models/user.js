class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  getUserName() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  setUserName(username) {
    this.username = username;
  }

  setPassword(password) {
    this.password = password;
  }
}
