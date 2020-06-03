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
    },
    getUserInfo: function(req, res){
        let userInfo = {};

        db.Forum
        .find({ userID: req.params.userID })
        .then(topicsResponse => {
            userInfo.userTopics = topicsResponse;

            db.Forum
            .find({ "posts.userID": req.params.userID })
            .then(postsResponse => {
                userInfo.userReplies = postsResponse;
                res.json(userInfo);
            })
            .catch(err => res.status(422).json(err));
        });
    },
    deleteReply: function(req, res){
        db.Forum
        .updateOne({ id: req.params.id, postID: req.params.postID }, { $pull: { posts: { _id: req.body.replyID } } })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    deleteTopic: function(req, res){
        db.Forum
        .deleteOne({ id: req.params.id, postID: req.params.postID })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    editTopic: function(req, res){
        db.Forum
        .updateOne({ id: req.params.id, postID: req.params.postID }, { title: req.body.title, body: req.body.body })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    },
    editReply: function(req, res){
        db.Forum
        .updateOne({ _id: req.params.id, "posts._id": req.params.replyID }, { $set: { "posts.$.body": req.body.body } } )
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    }
}