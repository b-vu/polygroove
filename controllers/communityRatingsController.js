const db = require("../models");

module.exports = {
    getRatings: function(req, res){
        db.Rating
        .findOne({ id: req.params.id })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => res.status(422).json(err));
    }
}