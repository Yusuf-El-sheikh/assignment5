const postsRepository = require("./posts.repository");
const bcrypt = require("bcrypt");

async function createPost(userId, title, content) {
    if (!await postsRepository.userExists(userId)) {
        const error = new Error("User not found.");
        error.status = 404;
        throw error;
    }
    //can add content validation and more error handlers for clarity of type of error, later

    return await postsRepository.createPost(userId, title, content);
}

async function deletePost(userId, postId) {
    const post = await postsRepository.getPostById(postId);

    if (post) {

        if (post.userId !== userId) {
            const error = new Error("Unauthorized process attempt failed.");
            error.status = 403;
            throw error;
        }

        return await postsRepository.deletePost(postId);
    }

    const error = new Error("Post not found.");
    error.status = 404;
    throw error;
}

async function getAllPosts() {
    const post = await postsRepository.getAllPosts();
    return post;
}

async function getPostsAndCommentsCount()
{
    const post = await postsRepository.getPostsAndCommentsCount();
    return post;
}

module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    getPostsAndCommentsCount
}