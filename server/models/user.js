const con = require("../models/db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS user (
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
  let sql = `SELECT * FROM User`;
  return await con.query(sql);
}

module.exports = { getAllUsers };
