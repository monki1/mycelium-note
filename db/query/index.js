
// const user = require('../account/user');
const { upsert } = require('./upsert');
const remove = require('./remove');
const find = require('./find');

module.exports = {
    // user,
    upsert,
    remove,
    intersect: find.byIntersection,
    union: find.byUnion,
    all: find.all
}




