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

const findCommentsByWord = async (word) => {
    const comment = await prisma.comments.findMany({
        where: { content: { contains: word } }
    });

    return comment;
}

const find3CommentsByPostId = async (postId) => {
    const comment = await prisma.comments.findMany({
        where: { postId: postId },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: { id: true, content: true, createdAt: true }
    });

    return comment;
}

const findById = async (commentId) => {
    const comment = await prisma.comments.findUnique({
        where: { id: commentId },
        include: {
            user: { select: { id: true, name: true, email: true } },
            post: { select: { id: true, title: true, content: true } }
        }
    });

    return comment;
}

module.exports = {
    createMany,
    findComment,
    updateComment,
    findCommentByDetails,
    createComment,
    findCommentsByWord,
    find3CommentsByPostId,
    findById
}