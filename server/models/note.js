const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS notes (
      noteID INT NOT NULL AUTO_INCREMENT,
      creationTime VARCHAR(12) NOT NULL,
      text VARCHAR(255) NOT NULL,
      picture VARCHAR(255) NOT NULL,
      PRIMARY KEY(noteID),
      userID INT NOT NULL,
      CONSTRAINT userFK FOREIGN KEY(userID) REFERENCES users(userID)
    );`;
  await con.query(sql);
}
createTable();

async function getAllNotes() {
  let sql = `SELECT * FROM notes`;
  return await con.query(sql);
}

module.exports = { getAllNotes };
