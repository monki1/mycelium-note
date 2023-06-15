const { authenticate, create, remove } = require('../../../db/account/user');
const assert = require('assert');

let username = Date.now().toString();
let password = Date.now().toString();
let userObj;

describe('User', () => {
    before('should insert a new item', async () => {
        const result = await create(username, password);
        userObj = result;
        assert.strictEqual(typeof result, 'object');
        console.log(result);
    });

    it('should authenticate a user', async () => {
        const result = await authenticate(username, password);
        console.log(result);
        assert.deepStrictEqual(result, userObj);
    });

    it('should remove a user with id', async () => {
        const result = await remove(userObj.id);
        assert.deepStrictEqual(result, {});
        console.log(result);
    });
});
