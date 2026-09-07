const commentsRepository = require("./comments.repository")
const postsRepository = require("../posts/posts.repository")
const userRepository = require("../users/users.repository")

async function createMany(comments) {
    for (const comment of comments) {
        if (!comment.content || !comment.postId || !comment.userId) {
            const error = new Error("Missing required fields.");
            error.status = 400;
            throw error;
        }
    }

    return await commentsRepository.createMany(comments);
}

async function updateComment(userId, commentId, content) {
    const comment = await commentsRepository.findComment(commentId);
    if (!comment) {
        const error = new Error("Comment not found.");
        error.status = 404;
        throw error;
    }
    if (comment.userId !== userId) {
        const error = new Error("Unauthorized process attempt failed.");
        error.status = 403;
        throw error;
    }
    if (!content) {
        const error = new Error("You can't make an empty comment.");
        error.status = 400;
        throw error;
    }

    return await commentsRepository.updateComment(commentId, content);
}

async function findOrCreate(userId, postId, content) {
    if (!content) {
        const error = new Error("You can't have nor make an empty comment.");
        error.status = 400;
        throw error;
    }

    const user = await userRepository.findById(userId);
    const post = await postsRepository.getPostById(postId);

    if (!user) {
        const error = new Error("User not found.");
        error.status = 404;
        throw error;
    }

    if (!post) {
        const error = new Error("Post not found.");
        error.status = 404;
        throw error;
    }

    const comment = await commentsRepository.findCommentByDetails(postId, userId, content);

    if (!comment) {
        const newComment = await commentsRepository.createComment(postId, userId, content);
        return { comment: newComment, created: true };
    }

    return { comment, created: false };
}

async function findCommentsByWord(word) {
    if (!word) {
        const error = new Error("Your search word can't be empty.");
        error.status = 400;
        throw error;
    }

    const comment = await commentsRepository.findCommentsByWord(word);

    if (comment.length === 0) {
        const error = new Error("Comments not found.");
        error.status = 404;
        throw error;
    }

    return { count: comment.length, comments: comment };
}

async function find3CommentsByPostId(postId) {
    if (!await postsRepository.getPostById(postId)) {
        const error = new Error("Post not found.");
        error.status = 404;
        throw error;
    }

    const comment = await commentsRepository.find3CommentsByPostId(postId);

    const length = comment.length;

    if (length === 0) {
        const error = new Error("Comments not found.");
        error.status = 404;
        throw error;
    }

    return { count: length, comments: comment };
}

async function findById(commentId) {
    const comment = await commentsRepository.findById(commentId);

    if (!comment) {
        const error = new Error("Comment not found.");
        error.status = 404;
        throw error;
    }

    return comment;
}

module.exports = {
    createMany,
    updateComment,
    findOrCreate,
    findCommentsByWord,
    find3CommentsByPostId,
    findById
}