const db = require("../models");

module.exports = {
    getFavorites: function(req, res){
        db.User
        .findById(req.params.id)
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    addFavArtist: function(req, res){
        db.User
        .update({ _id: req.params.id }, { $push: { favoriteArtists: req.body } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    removeFavArtist: function(req, res){
        db.User
        .update({ _id: req.params.id }, { $pull: { favoriteArtists: req.body } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    addFavAlbum: function(req, res){
        db.User
        .update({ _id: req.params.id }, { $push: { favoriteAlbums: req.body } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    removeFavAlbum: function(req, res){
        db.User
        .update({ _id: req.params.id }, { $pull: { favoriteAlbums: req.body } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    }
}