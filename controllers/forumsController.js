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
        const forum = new db.Forum({
            name: req.body.name,
            id: req.body.id
        });

        forum.save()
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    }
}