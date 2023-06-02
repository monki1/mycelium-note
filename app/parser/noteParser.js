const symbols = {
    start: '<',
    end: '>',
    separator: ':'
};
const typePattern = '[a-zA-Z0-9-_]+';
const valuePattern = '[a-zA-Z0-9-_]+';
const regex = new RegExp(`${symbols.start}\\s*(${typePattern})\\s*${symbols.separator}\\s*(${valuePattern})\\s*${symbols.end}(?!.*${symbols.start})`, 'g');

function extractSources(content) {
    let match;
    const sources = [];

    while ((match = regex.exec(content)) !== null) {
        const type = match[1];
        const value = match[2];

        const source = {type: type, value: value};
        sources.push(source);
    }

    return sources;
}


module.exports = {
    extractSources
};
