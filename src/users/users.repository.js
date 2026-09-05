const prisma = require('../common/db/prisma.js');

const userExists = async (email) => {
    const user = await prisma.users.findUnique({
        where: { email: email }, select: { id: true }
    });

    return !!user;
}

const createUser = async (name, email, password, role) => {
    const user = await prisma.users.create({
        data: { name: name, email: email, hashedPassword: password, role: role }, omit: { hashedPassword: true }
    });

    return user;
}

const upsertUser = async (id, updatedData) => {
    const user = await prisma.users.upsert({
        where: { id: id }, create: updatedData, update: updatedData
    });

    return user;
}

const findByEmail = async (email) => {
    const user = await prisma.users.findUnique({
        where: { email: email }
    });

    return user;
}

const findById = async (id) => {
    const user = await prisma.users.findUnique({
        where: { id: id }, omit: { role: true }
    });

    return user;
}

module.exports = {
    userExists,
    createUser,
    upsertUser,
    findByEmail,
    findById
}