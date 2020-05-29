const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    name: {
        type: String,
        requried: true
    },
    artist: {
        type: String,
        requried: true
    },
    id: {
        type: String,
        requried: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    ratings: [{ userID: String, userName: String, rating: Number, date: { type: Date, default: Date.now } }]
});

const Rating = mongoose.model("ratings", RatingSchema);

module.exports = Rating;