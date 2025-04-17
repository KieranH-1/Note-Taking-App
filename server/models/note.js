let noteForm = document.getElementById("note-form");
noteForm.addEventListener('submit', addNote);

function addNote(e) {
    e.preventDefault();

    let noteText = document.getElementById('note-text').value;
    let noteList = document.getElementById("note-list");
    let errorSection = document.getElementById("error-section");

    if (validString(noteText)) {
        errorSection.innerHTML = `Please enter a valid note!!!`;
    } else {
        errorSection.innerHTML = "";
        const note = new Note(noteText);

        noteList.innerHTML += `Note: ${note.getText()} <br>`;

        console.log(note);
    }

    document.getElementById("note-text").value = "";
}

function validString(str) {
    return str == "";
}

class Note{
    constructor(text) {
        this.text = text;
    }

    getText() {
        return this.text;
    }

    setText(text) {
        this.text = text;
    }
}