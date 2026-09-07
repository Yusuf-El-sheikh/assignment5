const commentsController = require("./comments.controller")
const {Router} = require("express")

const commentsRouter = Router();

//comments endpoint #1
commentsRouter.post("/", commentsController.createMany);

//comments endpoint #2
commentsRouter.patch("/:commentId", commentsController.updateComment);

//comments endpoint #3
commentsRouter.post("/find-or-create", commentsController.findOrCreate);

//comments endpoint #4
commentsRouter.get("/search", commentsController.findCommentsByWord);

//comments endpoint #5
commentsRouter.get("/newest/:postId", commentsController.find3CommentsByPostId);

//comments endpoint #6
commentsRouter.get("/details/:commentId", commentsController.findById);

module.exports = commentsRouter