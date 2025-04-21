const con = require("../models/db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS Note (
      CreationTime VARCHAR(12) NOT NULL,
      Text VARCHAR(255) NOT NULL,
      LengthOfTiemPosted VARCHAR(45) NOT NULL GENERATED,
      Picture VARCHAR(255) NOT NULL,
      CONSTRAINT notePK PRIMARY KEY(NoteID)
      CONSTRAINT noteFK FOREIGN KEY (UserID) REFERENCES User(UserID)
    );`
  await con.query(sql)  
}
createTable()

async function getAllNotes() {
    let sql = `SELECT * FROM User`
    return await con.query(sql)
}
  
module.exports = { getAllNotes }