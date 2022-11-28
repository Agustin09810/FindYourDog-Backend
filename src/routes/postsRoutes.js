const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();

router.get('/:postId', postsController.getPostById);
router.get('/', postsController.getPostByZone);
router.post('/', postsController.createPost);
router.put('/:postId', postsController.updatePostById);
router.delete('/:postId', postsController.deletePostById);

module.exports = router;