const db = require("../models");

module.exports = {
    getAll: function(req, res){
        db.Forum
        .find({})
        .sort({ "date": -1 })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    getAllPosts: function(req, res){
        db.Forum
        .find({})
        .sort({ "posts.date": -1 })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    getForumTopics: function(req, res){
        let response = {};
        db.Forum
        .find({ id: req.params.id })
        .sort({ "posts.date": -1 })
        .then(dbResponse => {
            response.recentReplies = dbResponse;

            db.Forum
            .find({ id: req.params.id })
            .sort({ "date": -1 })
            .then(dbResponse => {
                response.recentTopics = dbResponse;
                res.json(response);
            })
            .catch(err => res.status(422).json(err));
        });
    },
    addForum: function(req, res){
        const forum = new db.Forum(req.body);

        forum.save()
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    getTopicByPostID: function(req, res){
        db.Forum
        .findOne({ id: req.params.id, postID: req.params.postID })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    addReply: function(req, res){
        db.Forum
        .update({ _id: req.params.id }, { $push: { posts: req.body } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    }
}