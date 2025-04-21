const con = require("../models/db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS note (
      noteID INT NOT NULL AUTO_INCREMENT,
      creationTime VARCHAR(12) NOT NULL,
      text VARCHAR(255) NOT NULL,
      picture VARCHAR(255) NOT NULL,
      PRIMARY KEY(noteID),
      CONSTRAINT userFK FOREIGN KEY(userFK) REFERENCES users(userID)
    );`;
  await con.query(sql);
}
createTable();

async function getAllNotes() {
  let sql = `SELECT * FROM User`;
  return await con.query(sql);
}

module.exports = { getAllNotes };
