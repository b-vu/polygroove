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
  favoriteArtists: [{ artist: String, artistID: String, image: String }],
  favoriteAlbums: [{ name: String, id: String, artist: String, artistID: String, image: String }],
  favoriteTracks: [{ name: String, id: String, artist: String, artistID: String, image: String }],
  albumRatings: [{ name: String, id: String, artist: String, artistID: String, rating: Number, image: String }],
  trackRatings: [{ name: String, id: String, artist: String, artistID: String, rating: Number, image: String }]
});

const User = mongoose.model("users", UserSchema);

module.exports = User;