const router = require("express").Router();
const userRoutes = require("./users");

//User authentication routes
router.use("/users", userRoutes);

module.exports = router;