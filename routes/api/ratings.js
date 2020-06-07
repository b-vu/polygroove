const router = require("express").Router();
const ratingsController = require("../../controllers/ratingsController");

router.route("/album/:id")
    .get(ratingsController.getRatings)
    .post(ratingsController.addAlbumRating)
    .put(ratingsController.editAlbumRating);

router.route("/album/existing/:id")
    .put(ratingsController.addToExistingDBAlbum);

router.route("/track/existing/:id")
    .put(ratingsController.addToExistingDBTrack);

router.route("/track/:id")
    .get(ratingsController.getRatings)
    .post(ratingsController.addTrackRating)
    .put(ratingsController.editTrackRating);

router.route("/")
    .get(ratingsController.getAllRatings);

module.exports = router;