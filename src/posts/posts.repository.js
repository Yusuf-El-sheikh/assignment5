const prisma = require('../common/db/prisma.js');

const userExists = async (id) => {
    const user = await prisma.users.findUnique({
        where: { id: id }, select: { id: true }
    });

    return !!user;
}

const createPost = async (userId, title, content) => {
    const post = await prisma.posts.create({
        data: { userId: userId, title: title, content: content }
    });

    return post;
}

const getPostById = async (postId) => {
    const post = await prisma.posts.findUnique({
        where: { id: postId }
    });

    return post;
}

const deletePost = async (postId) => {
    const post = await prisma.posts.delete({
        where: { id: postId }
    });

    return post;
}

const getAllPosts = async () => {
    const post = await prisma.posts.findMany({
        select: {
            id: true, title: true,
            user: { select: { id: true, name: true } },
            comments: { select: { id: true, content: true } }
        }
    });

    return post;
}

const getPostsAndCommentsCount = async () => {
    const post = await prisma.posts.findMany({
        select: {
            id: true, title: true,
            _count: { select: { comments: true } }
        }
    });

    return post;
}

module.exports = {
    userExists,
    createPost,
    getPostById,
    deletePost,
    getAllPosts,
    getPostsAndCommentsCount
}