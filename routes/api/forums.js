const router = require("express").Router();
const forumsController = require("../../controllers/forumsController");

router.route("/")
    .get(forumsController.getAll);

router.route("/posts")
    .get(forumsController.getAllPosts);

router.route("/:id")
    .get(forumsController.getForumTopics)
    .post(forumsController.addForum);

router.route("/topic/:id")
    .post(forumsController.addForum);

router.route("/topic/:id/:postID")
    .get(forumsController.getTopicByPostID)
    .post(forumsController.addReply);

    // .put(forumsController.editTopic);
//     .post(forumsController.addTopic)
//     .post(forumsController.addPost)
//     .put(forumsController.editPost)
//     .delete(forumsController.deleteTopic)
//     .delete(forumsController.deletePost);

// router.route("/topic/")

module.exports = router;