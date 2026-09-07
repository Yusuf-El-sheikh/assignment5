const postsService = require("./posts.service")

async function createPost(req, res, next) {
    const { userId, title, content } = req.body;

    try {
        const post = await postsService.createPost(userId, title, content);
        res.status(201).json({ message: "Post created successfully.", createdPost: post });
    }
    catch (error) {
        next(error);
    }
};

async function deletePost(req, res, next) {
    const { userId } = req.body;
    const postId = parseInt(req.params.postId);
    try {
        const post = await postsService.deletePost(userId, postId);
        res.status(200).json({ message: "Post deleted successfully.", createdPost: post });
    }
    catch (error) {
        next(error);
    }
};

async function getAllPosts(req, res, next) {
    try {
        const posts = await postsService.getAllPosts();
        res.status(200).json({message: "Posts retrieved successfully.", posts: posts});
    } 
    catch (error) {
        next(error);
    }
}

async function getPostsAndCommentsCount(req, res, next) {
    try {
        const post = await postsService.getPostsAndCommentsCount();
        res.status(200).json({message: "Posts retrieved successfully.", posts: post});
    } 
    catch (error) {
        next(error);
    }
}
module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    getPostsAndCommentsCount
}