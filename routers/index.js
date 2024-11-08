import express from "express";
import UserRouter from "./usersRouter/index.js";
import PostsRouter from "./posts.Router/index.js";

const RootRouter = express.Router();

RootRouter.use("/v1", UserRouter);

RootRouter.use("/v2", PostsRouter);

export default RootRouter;
