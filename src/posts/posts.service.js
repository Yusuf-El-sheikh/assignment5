const postsRepository = require("./posts.repository");
const bcrypt = require("bcrypt");

async function createPost(userId, title, content) {
    if(!await postsRepository.userExists(userId))
    {
        const error = new Error("User not found.");
        error.status = 404;
        throw error;
    }
    
    return await postsRepository.createPost(userId, title, content);
}

module.exports = {
    createPost
}