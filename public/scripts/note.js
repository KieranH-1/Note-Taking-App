import { fetchData } from "./main.js";
import { getCurrentUser } from "./user.js";

let noteForm = document.getElementById("note-form");
noteForm.addEventListener("submit", addNote);

let noteList = document.getElementById("note-list");

const user = getCurrentUser();
if (!user) window.location.href = "login.html";

function getNotes() {
  const curUser = {
    userID: user.userID,
  };
  fetchData("/notes/getNotes", curUser, "POST")
    .then((data) => {
      if (!data.message) {
        data.forEach((note) => {
          noteList.innerHTML += `
          <div class="note">
            <img src="${note.picture}" alt="Note Picture">
            <div>
              <h3>${note.creationTime}<h3/>
              <p>${note.text} <p/>
            </div>
          </div>
          `;
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

getNotes();

function addNote(e) {
  e.preventDefault();

  const note = {
    text: document.getElementById("note-text").value,
    picture: document.getElementById("note-picture").value,
    creationTime: document.getElementById("date").value,
    userID: user.userID,
  };

  let errorSection = document.getElementById("error-section");

  fetchData("/notes/addNote", note, "POST")
    .then((data) => {
      if (!data.message) {
        window.location.href = "note.html";
      }
    })
    .catch((err) => {
      errorSection.innerHTML = `${err.message}`;
    });

  console.log(note);
}
