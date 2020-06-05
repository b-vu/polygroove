const db = require("../models");

module.exports = {
    getUserInfo: function(req, res){
        db.User
        .findOne({ _id: req.params.id })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    getForumInfo: function(req, res){
        db.Forum
        .find({ userID: req.params.id })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    editBio: function(req, res){
        console.log(req.params.id, req.body)
        db.User
        .updateOne({ _id: req.params.id }, { $set: { bio: req.body.bio } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    }
}