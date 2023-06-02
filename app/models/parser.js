const Source = require('./source');
const Note = require('./note');
class NoteParser {
    static parse(noteContent) {
        const note = new Note(noteContent);
        const regex = /<\s*([a-zA-Z0-9-]+)\s*:\s*([a-zA-Z0-9-]+)\s*>/g;
        let match;

        while ((match = regex.exec(note.content)) !== null) {
            const type = match[1];
            const value = match[2];

            const source = new Source(type, value);
            note.sources.push(source);
        }

        return note;
    }

    static parseNotes(noteContents) {
        const notes = [];
        let noteId = 1;

        for (const noteContent of noteContents) {
            const note = NoteParser.parse(noteContent);
            note.id = noteId++;
            notes.push(note);
        }

        return notes;
    }
}

module.exports = NoteParser;
//
// const noteContents = [
// "This is the first note with < type1:value-1>.",
//     "Here is another note with < type2 : value2 > and <type3:value3>.",
// ];
//
// const parsedNotes = NoteParser.parseNotes(noteContents);
//
// console.log(parsedNotes);
// parsedNotes.forEach(note => note.sources.forEach(source => console.log(source)));
//
