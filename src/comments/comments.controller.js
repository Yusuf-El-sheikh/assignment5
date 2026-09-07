const commentsService = require("./comments.service")

async function createMany(req, res, next) {
    const { comments } = req.body;

    try {
        const comment = await commentsService.createMany(comments);
        res.status(201).json({ message: "Created comments successfully", createdComments: comments });
    }
    catch (error) {
        next(error);
    }
}

async function updateComment(req, res, next) {
    const commentId = parseInt(req.params.commentId);
    const { userId, content } = req.body;

    try {
        const comment = await commentsService.updateComment(userId, commentId, content);
        res.status(200).json({ message: "Comment updated successfully.", updatedComments: comment });
    }
    catch (error) {
        next(error);
    }
}

async function findOrCreate(req, res, next) {
    const { postId, userId, content } = req.body;

    try {
        const comment = await commentsService.findOrCreate(userId, postId, content);
        res.status(200).json({ message: "Success.", comment })
    }
    catch (error) {
        next(error);
    }
}

async function findCommentsByWord(req, res, next) {
    const word = req.query.word;

    try {
        const comment = await commentsService.findCommentsByWord(word);
        res.status(200).json({ message: "Success.", comment });
    }
    catch (error) {
        next(error);
    }
}

async function find3CommentsByPostId(req, res, next) {
    const postId = parseInt(req.params.postId);

    try {
        const comment = await commentsService.find3CommentsByPostId(postId);
        res.status(200).json({ message: "Success.", comment });
    }
    catch (error) {
        next(error);
    }
}

async function findById(req, res, next) {
    const commentId = parseInt(req.params.commentId);

    try {
        const comment = await commentsService.findById(commentId);
        res.status(200).json({ message: "Success.", comment });
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    createMany,
    updateComment,
    findOrCreate,
    findCommentsByWord,
    find3CommentsByPostId, 
    findById
}