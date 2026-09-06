const usersRepository = require("./users.repository");
const bcrypt = require("bcrypt");

async function register(name, email, password, role) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const error = new Error("Invalid email format.");
        error.status = 400;
        throw error;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        const error = new Error("Invalid password format.");
        error.status = 400;
        throw error;
    }

    if (await usersRepository.userExists(email)) {
        const error = new Error("This email is already in use.");
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return await usersRepository.createUser(name, email, hashedPassword, role);
}

async function upsert(id, updatedData) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedData.email)) {
        const error = new Error("Invalid email format.");
        error.status = 400;
        throw error;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(updatedData.password)) {
        const error = new Error("Invalid password format.");
        error.status = 400;
        throw error;
    }

    updatedData.hashedPassword = await bcrypt.hash(updatedData.password, 10);
    delete updatedData.password;

    return await usersRepository.upsertUser(id, updatedData);
}

async function getByEmail(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const error = new Error("Invalid email format.");
        error.status = 400;
        throw error;
    }

    const user = await usersRepository.findByEmail(email);
    if (!user) {
        const error = new Error("no user found");
        error.status = 404;
        throw error;
    }

    return user;
}

async function getById(id) {
    const user = await usersRepository.findById(id);
    if (!user) {
        const error = new Error("no user found");
        error.status = 404;
        throw error;
    }
    return user;
}
module.exports = {
    register,
    upsert,
    getByEmail,
    getById
}