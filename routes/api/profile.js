const router = require("express").Router();
const profileController = require("../../controllers/profileController");

router.route("/:id")
    .get(profileController.getUserInfo)
    .post(profileController.editBio);

router.route("/forum/:id")
    .get(profileController.getForumInfo);    

module.exports = router;