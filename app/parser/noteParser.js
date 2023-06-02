
function extractSources(content) {
    const regex = /<\s*([a-zA-Z0-9-]+)\s*:\s*([a-zA-Z0-9-]+)\s*>/g;
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
