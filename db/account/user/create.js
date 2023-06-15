
const User = require('../../models/User');

const create = async(username, password) => {
    try {
        const user = await User.forge({ username, password }).save();
        return user.toJSON();
    } catch (error) {
        throw new Error('Error creating user.');
    }
}

module.exports = create;