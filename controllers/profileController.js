const db = require("../models");

module.exports = {
    getUserInfo: function(req, res){
        db.User
        .findOne({ _id: req.params.id })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    }
}