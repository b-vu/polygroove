const db = require("../models");

module.exports = {
    getAll: function(req, res){
        db.Forum
        .find({})
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    getForumTopics: function(req, res){
        db.Forum
        .findOne({ id: req.params.id })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    addForum: function(req, res){
        const forum = new db.Forum(req.body);

        forum.save()
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    getTopicByPostID: function(req, res){
        db.Forum
        .findOne({ id: req.params.id, "topics.postID": req.params.postID })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    addTopic: function(req, res){
        db.Forum
        .update({ id: req.params.id }, { $push: { topics: req.body } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    addReply: function(req, res){
        db.Forum
        .update({ _id: req.params.id, "topics._id": req.params.postID }, { $addToSet: { "topics.$.posts": req.body } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    }
}