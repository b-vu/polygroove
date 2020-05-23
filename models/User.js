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
  favoriteArtists: [{ name: String, id: String, image: String }],
  favoriteAlbums: [{ name: String, artist: String, id: String, image: String }],
  favoriteTracks: [{ name: String, artist: String, id: String, image: String }],
  albumRatings: [{ name: String, artist: String, id: String, rating: Number, image: String }],
  trackRatings: [{ name: String, artist: String, id: String, rating: Number, image: String }]
});

const User = mongoose.model("users", UserSchema);

module.exports = User;