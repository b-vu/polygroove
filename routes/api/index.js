const router = require("express").Router();
const userRoutes = require("./users");
const favRoutes = require("./favorites");
const ratingRoutes = require("./ratings");
const communityRatingRoutes = require("./communityRatings");
const forumRoutes = require("./forums");
const profileRoutes = require("./profile");

//User authentication routes
router.use("/users", userRoutes);

router.use("/favorites", favRoutes);

router.use("/ratings", ratingRoutes);

router.use("/communityratings", communityRatingRoutes);

router.use("/forums", forumRoutes);

router.use("/profile", profileRoutes);

module.exports = router;