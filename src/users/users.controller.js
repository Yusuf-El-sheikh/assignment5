const usersService = require("./users.service");

async function register(req, res, next) {
    const { name, email, password, role } = req.body;

    try {
        const user = await usersService.register(name, email, password, role);
        return res.status(201).json({ message: "User created successfully", createdUser: user });
    }
    catch (error) {
        next(error);
    }
}

async function upsert(req, res, next) {
    const { name, email, password, role } = req.body;
    const id = parseInt(req.params.id);

    let updatedData = {};

    if (name) { updatedData.name = name; }
    if (email) { updatedData.email = email; }
    if (password) { updatedData.password = password; }
    if (role) { updatedData.role = role; }

    try {
        const user = await usersService.upsert(id, updatedData);
        return res.status(200).json({ message: "User updated or created successfully.", createdUser: user });
    }
    catch (error) {
        next(error);
    }
}

async function getByEmail(req, res, next) {
    const email = req.query.email;

    try {
        const user = await usersService.getByEmail(email);
        return res.status(200).json({ message: "Success.", user: user });
    }
    catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    const id = parseInt(req.params.id);

    try {
        const user = await usersService.getById(id);
        return res.status(200).json({message: "Success", user: user});
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    upsert,
    getByEmail,
    getById
}