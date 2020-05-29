const router = require("express").Router();
const forumsController = require("../../controllers/forumsController");

router.route("/")
    .get(forumsController.getAll);

router.route("/:id")
    .get(forumsController.getForumTopics)
    .post(forumsController.addForum);
//     .post(forumsController.addTopic)
//     .post(forumsController.addPost)
//     .put(forumsController.editTopic)
//     .put(forumsController.editPost)
//     .delete(forumsController.deleteTopic)
//     .delete(forumsController.deletePost);

// router.route("/topic/")

module.exports = router;