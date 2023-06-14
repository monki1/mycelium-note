

//userid note

const Note = require('../../models/note');
const Tag = require("../../models/Tag");

const   insert = async (note, userId) => {
    const tags = note.tags;
    const content = note.content;

    console.log("insert tags", tags);
    const noteObj = (await Note.forge({ content: content, user_id: userId }).save()).toJSON();


    for(let i = 0; i < tags.length; i++){
        const tag = tags[i];
        const tagObj = await Tag.createTag(tag.type, tag.value, userId, noteObj.id);
        console.log("tag object",tagObj);
    }

    console.log(noteObj);
    return noteObj;
}

module.exports = insert;