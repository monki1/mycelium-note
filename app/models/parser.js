const Source = require('./source');
const Note = require('./note');

function extractSources(content) {
    const regex = /<\s*([a-zA-Z0-9-]+)\s*:\s*([a-zA-Z0-9-]+)\s*>/g;
    let match;
    const sources = [];

    while ((match = regex.exec(content)) !== null) {
        const type = match[1];
        const value = match[2];

        const source = new Source(type, value);
        sources.push(source);
    }

    return sources;
}

function parse(noteContent) {
    const note = new Note(noteContent);
    note.sources = extractSources(noteContent);
    return note;
}

module.exports = {
    parse
};
