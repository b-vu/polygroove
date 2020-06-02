const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    name: {
        type: String,
        requried: true
    },
    id: {
        type: String,
        requried: true
    },
    userID: String,
    userName: String,
    title: String,
    body: String,
    postID: String,
    date: {
        type: Date,
        default: Date.now
    },
    posts: [{
        userID: String,
        userName: String,
        body: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

const Forum = mongoose.model("forums", ForumSchema);

module.exports = Forum;