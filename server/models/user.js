const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
      userID INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      CONSTRAINT userPK PRIMARY KEY(userID)
    );`;
  await con.query(sql);
}
createTable();

// CRUD Operations
async function getAllUsers() {
  let sql = `SELECT * FROM users`;
  return await con.query(sql);
}

// READ in CRUD: Logging in a user
async function login(user) {
  let cUser = await userExists(user.username);
  if (!cUser[0]) throw Error("Username does not exist!");
  if (cUser[0].password != user.password) throw Error("Password is incorrect!");

  return cUser[0];
}

async function userExists(username) {
  let sql = `
    SELECT * FROM users
    WHERE username="${username}"
  `;
  return await con.query(sql);
}

// CREATE in CRUD - Registering a user
async function register(user) {
  const cUser = await userExists(user.username);
  if (cUser.length > 0) throw Error("Username already in use!");

  let sql = `
    INSERT INTO users(password, username, email)
    VALUES("${user.password}", "${user.username}", "${user.email}")
  `;
  await con.query(sql);

  return await login(user);
}

async function editUsername(user) {
  let sql = `
    UPDATE users SET
    username = "${user.username}"
    WHERE userId = ${user.userID}
  `;
  await con.query(sql);
  const currentUser = await userExists(user.username);
  return currentUser[0];
}

// USER Example:
const user = {
  username: "Bobbyiscool",
  email: "b@b",
  password: "cathysucks",
};
async function deleteAccount(user) {
  let sql = `
    SELECT * FROM users
    WHERE userID = ${user.userID}
  `;
  let cUser = await con.query(sql);
  if (!cUser[0]) throw Error("User does not exist!");

  sql = `
    DELETE FROM users
    WHERE userID = ${user.userID}
  `;
  await con.query(sql);
}

module.exports = { getAllUsers, login, register, editUsername, deleteAccount };
