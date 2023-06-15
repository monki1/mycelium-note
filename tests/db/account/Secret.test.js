const verifySecret = require('../../../db/account/secret/verifySecret');
const createSecret = require('../../../db/account/secret/createSecret');
const assert = require("assert");


let userId = 3;
let secretToken = null;



describe('Secret', async () => {

    it('should return a secret', async () => {
        let result = null;
            result = await createSecret(userId);
        // const result = await createSecret(1);
        console.log(result);
        secretToken = result.token;
        assert.strictEqual(typeof result.token, 'string');
    });

    it('should return a user_id', async () => {
        const result = await verifySecret(secretToken);
        // console.log("should return user obj", result);
        assert.strictEqual(result, userId);
    });

});


