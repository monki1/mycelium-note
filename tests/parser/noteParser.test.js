const { extractTags } = require('../../parser/noteParser');
const assert = require('assert');

describe('Extract Tags', () => {
    it('should extract tags correctly from the first test case', () => {
        const input = '<tag1:value1> some text <tag2:value2>';
        const expectedOutput = [{ type: 'tag1', value: 'value1' }, { type: 'tag2', value: 'value2' }];

        const extractedTags = extractTags(input);
        console.log('Extracted Tags:', extractedTags);

        assert.deepStrictEqual(extractedTags, expectedOutput);

        console.log('Example Input:', input);
        console.log('Expected Output:', expectedOutput);
        console.log('Extracted Tags:', extractedTags);

        console.log('---');
    });

    it('should extract tags correctly from the second test case', () => {
        const input = '<tag3:value3>';
        const expectedOutput = [{ type: 'tag3', value: 'value3' }];

        const extractedTags = extractTags(input);

        assert.deepStrictEqual(extractedTags, expectedOutput);

        console.log('Example Input:', input);
        console.log('Expected Output:', expectedOutput);
        console.log('Extracted Tags:', extractedTags);

        console.log('---');
    });

    it('should not extract any tags from the third test case', () => {
        const input = 'No tags in this text';
        const expectedOutput = [];

        const extractedTags = extractTags(input);

        assert.deepStrictEqual(extractedTags, expectedOutput);

        console.log('Example Input:', input);
        console.log('Expected Output:', expectedOutput);
        console.log('Extracted Tags:', extractedTags);

        console.log('---');
    });

    it('should extract tags correctly from the fourth test case', () => {
        const input = '<tag4:value4>';
        const expectedOutput = [{ type: 'tag4', value: 'value4' }];

        const extractedTags = extractTags(input);

        assert.deepStrictEqual(extractedTags, expectedOutput);

        console.log('Example Input:', input);
        console.log('Expected Output:', expectedOutput);
        console.log('Extracted Tags:', extractedTags);

        console.log('---');
    });
});
