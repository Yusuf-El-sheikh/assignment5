const postsController = require("./posts.controller")
const { Router } = require("express")
const postsRouter = Router();

//posts endpoint #1
postsRouter.post("/", postsController.createPost);

//posts endpoint #2
postsRouter.delete("/:postId", postsController.deletePost);

//posts endpoint #3
postsRouter.get("/details", postsController.getAllPosts);

//posts endpoint #4
postsRouter.get("/comment-count", postsController.getPostsAndCommentsCount);

module.exports = postsRouter