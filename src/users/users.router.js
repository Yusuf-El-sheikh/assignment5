const usersController = require("./users.controller");
const { Router } = require("express");
const usersRouter = Router();

//user's endpoint #1
usersRouter.post("/register", usersController.register);

//user's endpoint #2
usersRouter.put("/:id", usersController.upsert);

//user's endpoint #3
usersRouter.get("/by-email", usersController.getByEmail);

//user's endpoint #4
usersRouter.get("/:id", usersController.getById);
module.exports = usersRouter ;