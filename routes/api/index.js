const router = require("express").Router();
const userRoutes = require("./users");
const favRoutes = require("./favorites");

//User authentication routes
router.use("/users", userRoutes);

router.use("/favorites", favRoutes);

module.exports = router;