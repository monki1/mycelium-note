const User = require('../../models/User');

const remove = async(id) => {
    try {
        const user = await User.where({ id }).destroy();
        return user.toJSON();
    } catch (error) {
        throw new Error('Error removing user.');
    }
}

module.exports = remove;