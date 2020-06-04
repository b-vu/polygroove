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
    .post(forumsController.addReply)
    .put(forumsController.deleteReply)
    .delete(forumsController.deleteTopic);

router.route("/topic/edit/:id/:postID")
    .put(forumsController.editTopic);

router.route("/reply/edit/:id/:replyID")
    .put(forumsController.editReply);

router.route("/user/:userID")
    .get(forumsController.getUserInfo);

module.exports = router;