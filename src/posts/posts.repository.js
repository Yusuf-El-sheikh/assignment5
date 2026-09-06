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

module.exports = {
    userExists,
    createPost,
}