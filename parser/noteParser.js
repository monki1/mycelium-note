const symbols = {
    start: '<',
    end: '>',
    separator: ':'
};

const patterns = {
    type: '[a-zA-Z0-9-_]+',
    value: '[a-zA-Z0-9-_]+'
};

const regex = new RegExp(
    `${symbols.start}\\s*(${patterns.type})\\s*${symbols.separator}\\s*(${patterns.value})\\s*${symbols.end}(?!.*${symbols.start})`,
    'g'
);

function extractTags(content) {
    let match;
    const tags = [];

    while ((match = regex.exec(content)) !== null) {
        const type = match[1];
        const value = match[2];

        const tag = { type, value };
        tags.push(tag);
    }

    return tags;
}

module.exports = {
    extractTags
};
