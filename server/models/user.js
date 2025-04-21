const con = require("../models/db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS User (
      UserID INT NOT NULL AUTO_INCREMENT,
      Username VARCHAR(255) NOT NULL UNIQUE,
      Email VARCHAR(255) NOT NULL UNIQUE,
      Password VARCHAR(255) NOT NULL,
      CONSTRAINT userPK PRIMARY KEY(UserID)
    );`
  await con.query(sql)  
}
createTable()

async function getAllUsers() {
    let sql = `SELECT * FROM User`
    return await con.query(sql)
  }
  
  module.exports = { getAllUsers }