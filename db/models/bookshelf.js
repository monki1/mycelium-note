require('dotenv').config();

const knexConfig = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            ssl: process.env.DB_SSL === 'true' ? true : false,
        },
    },
};

const knex = require('knex')(knexConfig.development);
const bookshelf = require('bookshelf')(knex);

const User = bookshelf.model('User', {
    tableName: 'users',
    notes() {
        return this.hasMany('Note');
    },
    tags() {
        return this.hasMany('Tag');
    },
});

const Note = bookshelf.model('Note', {
    tableName: 'notes',
    user() {
        return this.belongsTo(User);
    },
    tags() {
        return this.hasMany('Tag');
    },
});



const TagType = bookshelf.model('TagType', {
    tableName: 'tag_types',
    tags() {
        return this.hasMany('Tag');
    },
});

const Tag = bookshelf.model('Tag', {
    tableName: 'tags',
    note() {
        return this.belongsTo(Note);
    },
    tagType() {
        return this.belongsTo(TagType);
    },
    user() {
        return this.belongsTo(User);
    },
});

const Secret = bookshelf.model('Secret', {
    tableName: 'secrets',
    user() {
        return this.belongsTo(User);
    }
});


module.exports = { bookshelf, User, Note, Tag, TagType, Secret: Secret};