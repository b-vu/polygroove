const router = require("express").Router();
const favController = require("../../controllers/favController");

router.route("/artist/:id")
    .get(favController.getFavorites)
    .post(favController.addFavArtist)
    .put(favController.removeFavArtist);

router.route("/album/:id")
    .get(favController.getFavorites)
    .post(favController.addFavAlbum)
    .put(favController.removeFavAlbum);

module.exports = router;