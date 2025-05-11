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
async function getNotes(user) {
  let sql = `SELECT * FROM notes WHERE userID = ${user.userID}`;
  return await con.query(sql);
}
async function addNote(note) {
  let sql = `INSERT INTO notes (creationTime, text, picture, userID) VALUES ("${note.creationTime}", "${note.text}", "${note.picture}", ${note.userID})`;
  return await con.query(sql);
}
async function updateNote(note) {
  let sql = `SELECT * FROM notes WHERE noteID = "${note.noteID}"`;
  let result = await con.query(sql);
  if (result.length === 0) throw Error("Note does not exist!");
  if (result[0].userID !== note.userID)
    throw Error("You are not authorized to update this note!");

  sql = `UPDATE notes SET creationTime = "${note.creationTime}", text = "${note.text}", picture = "${note.picture}" WHERE noteID = ${note.noteID}`;
  return await con.query(sql);
}
async function deleteNote(note) {
  let sql = `SELECT * FROM notes WHERE noteID = "${note.noteID}"`;
  let result = await con.query(sql);
  if (result.length === 0) throw Error("Note does not exist!");
  if (result[0].userID !== note.userID)
    throw Error("You are not authorized to delete this note!");

  sql = `DELETE FROM notes WHERE noteID = "${note.noteID}"`;
  return await con.query(sql);
}

module.exports = {
  getNotes,
  getAllNotes,
  addNote,
  updateNote,
  deleteNote,
  createTable,
};
