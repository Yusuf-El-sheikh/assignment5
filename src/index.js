const { config } = require("dotenv");

const usersRouter = require("./users/users.router");
const postsRouter = require("./posts/posts.router");

const express = require("express");
const app = express();

app.use(express.json());

app.use("/user", usersRouter);
app.use("/post", postsRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Page not found", success: false });
});

app.use(globalErrorHandler);

app.listen(3000, () => {
    console.log("Listening on port 3000.");
});