const router = require("express").Router();
const communityRatingsController = require("../../controllers/communityRatingsController");

router.route("/:id")
    .get(communityRatingsController.getRatings);

module.exports = router;