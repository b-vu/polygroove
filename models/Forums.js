const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    name: {
        type: String,
        requried: true
    },
    id: {               //id of the artist or genre
        type: String,
        requried: true
    },
    topics: [{
        userID: String,
        userName: String,
        title: String,
        body: String,
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
    }]
});

const Forum = mongoose.model("forums", ForumSchema);

module.exports = Forum;