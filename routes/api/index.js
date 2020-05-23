const router = require("express").Router();
const userRoutes = require("./users");
const favRoutes = require("./favorites");
const ratingRoutes = require("./ratings");

//User authentication routes
router.use("/users", userRoutes);

router.use("/favorites", favRoutes);

router.use("/ratings", ratingRoutes);

module.exports = router;