import express from "express";
import postsController from "../../controllers/postsController.js";
import usersMiddleware from "../../middleware/usersMiddleware.js";

const PostsRouter = express.Router();

PostsRouter.post(
  "/posts",
  usersMiddleware.checkAuth,
  postsController.createPost
);

PostsRouter.put(
  "/posts/:postId",
  usersMiddleware.checkAuth,
  postsController.updatedPost
);

export default PostsRouter;
