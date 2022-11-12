const express = require("express");
const postsController = require("../../controllers/postsController");

const router = express.Router();

//Los controlers se encargan de hacer todo el trabajo de la petición manejando los req y res.
router.get("/", postsController.getAllPosts);
router.post("/", postsController.createNewPost);
router.get("/:postId", postsController.getPostById);


module.exports = router;