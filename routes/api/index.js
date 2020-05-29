const router = require("express").Router();
const userRoutes = require("./users");
const favRoutes = require("./favorites");
const ratingRoutes = require("./ratings");
const communityRatingRoutes = require("./communityRatings");
const forumRoutes = require("./forums");

//User authentication routes
router.use("/users", userRoutes);

router.use("/favorites", favRoutes);

router.use("/ratings", ratingRoutes);

router.use("/communityratings", communityRatingRoutes);

router.use("/forums", forumRoutes);

module.exports = router;