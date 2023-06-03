const { extractSources } = require('../../app/parser/noteParser');

function runExtractSourcesTests() {
    try {
        const testCases = [
            { input: '<source1:value1> some text <source2:value2>', output: [{ type: 'source1', value: 'value1' }, { type: 'source2', value: 'value2' }] },
            { input: '<source3:value3>', output: [{ type: 'source3', value: 'value3' }] },
            { input: 'No sources in this text', output: [] },
            { input: '<source4:value4>', output: [{ type: 'source4', value: 'value4' }] },
        ];

        for (const testCase of testCases) {
            const { input, output } = testCase;

            const extractedSources = extractSources(input);

            console.log('Example Input:', input);
            console.log('Expected Output:', output);
            console.log('Extracted Sources:', extractedSources);

            const comparisonResult = JSON.stringify(extractedSources) === JSON.stringify(output);
            console.log('Comparison Result:', comparisonResult);

            console.log('---');
        }

        console.log('Extracted sources tests completed');
    } catch (error) {
        console.error('Error running extractSources tests:', error);
    }
}

function runTests() {
    runExtractSourcesTests();
}

runTests();
