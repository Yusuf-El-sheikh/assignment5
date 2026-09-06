const commentsController = require("./comments.controller")
const {Router} = require("express")

const commentsRouter = Router();

//comments endpoint #1
commentsRouter.post("/", commentsController.createMany);

//comments endpoint #2
commentsRouter.patch("/:commentId", commentsController.updateComment);

//comments endpoint #3
commentsRouter.post("/find-or-create", commentsController.findOrCreate);

module.exports = commentsRouter