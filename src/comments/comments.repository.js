const prisma = require('../common/db/prisma.js');

const createMany = async (comments) => {
    const comment = await prisma.comments.createMany({
        data: comments
    });

    return comments;
}

const findComment = async (commentId) => {
    const comment = await prisma.comments.findFirst(
        {
            where: { id: commentId }
        }
    );

    return comment;
}

const updateComment = async (commentId, content) => {
    const comment = await prisma.comments.update({
        where: { id: commentId }, data: { content: content }
    });

    return comment;
}

const findCommentByDetails = async (postId, userId, content) => {
    const comment = await prisma.comments.findFirst({
        where: { postId, userId, content }
    });

    return comment;
}

const createComment = async (postId, userId, content) => {
    const comment = await prisma.comments.create({
        data: { postId, userId, content }
    });

    return comment;
}

module.exports = {
    createMany,
    findComment,
    updateComment,
    findCommentByDetails,
    createComment
}