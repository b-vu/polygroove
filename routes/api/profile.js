const router = require("express").Router();
const profileController = require("../../controllers/profileController");

router.route("/:id")
    .get(profileController.getUserInfo);

module.exports = router;