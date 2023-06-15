const User = require('../../models/User');

const authenticateUser = async(username, password) => {
    try {
        const user = await User.where({ username, password }).fetch();
        return user.toJSON();
    } catch (error) {
        throw new Error('Error authenticating user.');
    }
}

module.exports = authenticateUser;