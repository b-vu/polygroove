const router = require("express").Router();
const ratingsController = require("../../controllers/ratingsController");

router.route("/album/:id")
    .get(ratingsController.getRatings)
    .post(ratingsController.addAlbumRating)
    .put(ratingsController.editAlbumRating);

router.route("/track/:id")
    .get(ratingsController.getRatings)
    .post(ratingsController.addTrackRating)
    .put(ratingsController.editTrackRating);

module.exports = router;