const {Secret}= require('../../models/bookshelf');


async function verifySecret(token){
    //returns user id if token is valid
    let s = null;
    try{
        s = await Secret.where({token: token}).fetch();
    }catch(e){
        console.log(e);
    }
    let expired = false;
    //TODO: check if expired

    if(s === null || expired){
        return null;
    }
    const userId = s.toJSON().user_id;
    return userId;
}

module.exports = verifySecret;