const db = require("../models");

module.exports = {
    getRatings: function(req, res){
        db.User
        .findById(req.params.id)
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    addAlbumRating: function(req, res){
        db.User
        .update({ _id: req.params.id }, { $push: { albumRatings: req.body } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    editAlbumRating: function(req, res){
        db.User
        .updateOne({ _id: req.params.id, "albumRatings.id": req.body.id }, { $set: { "albumRatings.$.rating": req.body.rating } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    addTrackRating: function(req, res){
        db.User
        .update({ _id: req.params.id }, { $push: { trackRatings: req.body } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    editTrackRating: function(req, res){
        db.User
        .updateOne({ _id: req.params.id, "trackRatings.id": req.body.id }, { $set: { "trackRatings.$.rating": req.body.rating } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    }
}