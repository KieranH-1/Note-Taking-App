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

async function getAllUsers() {
  let sql = `SELECT * FROM users`;
  return await con.query(sql);
}
async function login(user) {
  let sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  return await con.query(sql, [user.username, user.password]);
}
async function register(user) {
  let sql = `INSERT INTO users (username, email, password) VALUES (${user.username}, ${user.email}, ${user.password})`;
  return await con.query(sql);
}
async function updateUser(user) {
  let sql = `UPDATE users SET username = ?, email = ?, password = ? WHERE userID = ?`;
  return await con.query(sql, [
    user.username,
    user.email,
    user.password,
    user.userID,
  ]);
}
async function deleteUser(user) {
  let sql = `DELETE FROM users WHERE userID = ?`;
  return await con.query(sql, [user.userID]);
}

module.exports = {
  getAllUsers,
  login,
  register,
  updateUser,
  deleteUser,
  createTable,
};
