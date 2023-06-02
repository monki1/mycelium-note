const symbols = {
    start: '<',
    end: '>',
    separator: ':'
};
const regex = new RegExp(`${symbols.start}\\s*([a-zA-Z0-9-]+)\\s*${symbols.separator}\\s*([a-zA-Z0-9-]+)\\s*${symbols.end}`, 'g');

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
