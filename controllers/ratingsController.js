const db = require("../models");

module.exports = {
    getRatings: function(req, res){
        db.User
        .findById(req.params.id)
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    addAlbumRating: function(req, res){
        let userRating;
        let communityRating;

        db.User
        .update({ _id: req.params.id }, { $push: { albumRatings: req.body } })
        .then(dbResponse => {
            userRating = dbResponse;
            const rating = new db.Rating({
                name: req.body.name,
                artist: req.body.artist,
                id: req.body.id,
                ratings: [{
                    userID: req.params.id,
                    userName: req.body.userName,
                    rating: req.body.rating
                }]
            });
            rating.save()
        })
        .then(dbResponse => {
            communityRating = dbResponse;
            const response = [userRating, communityRating];
            res.json(response);
        })
        .catch(err => res.status(422).json(err));
    },
    editAlbumRating: function(req, res){
        let userRating;
        let communityRating;

        db.User
        .updateOne({ _id: req.params.id, "albumRatings.id": req.body.id }, { $set: { "albumRatings.$.rating": req.body.rating } })
        .then(dbResponse => {
            userRating = dbResponse;
        })
        db.Rating.updateOne({ id: req.body.id, "ratings.userID": req.params.id }, { $set: { "ratings.$.rating": req.body.rating } })
        .then(dbResponse => {
            communityRating = dbResponse;
            const response = [userRating, communityRating];
            res.json(response);
        })
        .catch(err => res.status(422).json(err));
    },
    addTrackRating: function(req, res){
        let userRating;
        let communityRating;

        db.User
        .update({ _id: req.params.id }, { $push: { trackRatings: req.body } })
        .then(dbResponse => {
            userRating = dbResponse;
            const rating = new db.Rating({
                name: req.body.name,
                artist: req.body.artist,
                id: req.body.id,
                ratings: [{
                    userID: req.params.id,
                    userName: req.body.userName,
                    rating: req.body.rating
                }]
            });
            rating.save()
        })
        .then(dbResponse => {
            communityRating = dbResponse;
            const response = [userRating, communityRating];
            res.json(response);
        })
        .catch(err => res.status(422).json(err));
    },
    editTrackRating: function(req, res){
        let userRating;
        let communityRating;

        db.User
        .updateOne({ _id: req.params.id, "trackRatings.id": req.body.id }, { $set: { "trackRatings.$.rating": req.body.rating } })
        .then(dbResponse => {
            userRating = dbResponse;
        })
        db.Rating.updateOne({ id: req.body.id, "ratings.userID": req.params.id }, { $set: { "ratings.$.rating": req.body.rating } })
        .then(dbResponse => {
            communityRating = dbResponse;
            const response = [userRating, communityRating];
            res.json(response);
        })
        .catch(err => res.status(422).json(err));
    }
}