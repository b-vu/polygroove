const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  favoriteArtists: [{ name: String, id: String }],
  favoriteAlbums: [{ name: String, id: String }],
  favoriteTracks: [{ name: String, id: String }],
  albumRatings: [{ name: String, id: String, rating: Number }],
  trackRatings: [{ name: String, id: String, rating: Number }]
});

const User = mongoose.model("users", UserSchema);

module.exports = User;