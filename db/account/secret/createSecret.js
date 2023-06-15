

//takes in user id and returns a secret string


const {Secret} = require("../../models/bookshelf");

function generateToken(){
    const token = (Math.random() + 1).toString(36).substring(2, 15) + (Math.random() + 1).toString(36).substring(2, 15);
    return token;
}

async function createSecret(userId) {

    let token = null;
    let exists = true;
    while (token === null || exists) {
        try {
            //check if token exists
            const s = await Secret.where({token: token}).fetch();
            if (s !== null) {
                exists = true;
            }
        }catch (e) {
            exists = false;
        }
        token = generateToken();
    }

    // //TODO delete old secrets if expired
    // try{
    //     await Secret.where({user_id: userId}).destroy();
    // }catch (e) {
    //     // console.log("destroy",e);
    // }

    const secret = await
    Secret.forge({
        user_id: userId,
        token: token,
    }).save();
    return secret.toJSON();

    /*
    {
      user_id: 1,
      token: 'v5ea2hct5b8jvzhu3ldj',
      id: 5,
      create_at: 2023-06-15T19:55:01.996Z
    }
   */
}

module.exports = createSecret;









// create a token in secrets table with created_at and expires_at

// return the token

