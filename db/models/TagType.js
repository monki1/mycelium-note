const { bookshelf, TagType } = require('./bookshelf');


TagType.getByString = async function (string) {
    let tagType;
    try {
        tagType = await this.where({type: string}).fetch();
    } catch (err) {
        // console.error(err);
    }
    if (!tagType) {
        // If no matching record exists, create a new one
        tagType = await this.forge({ type: string }).save();
    }
    return tagType.toJSON();
};

TagType.getById = async function (id) {
    return await this.where({ id: id }).fetch();
};

module.exports = TagType;
