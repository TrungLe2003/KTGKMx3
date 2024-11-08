import express from "express";
import UsersController from "../../controllers/usersController.js";
import usersMiddleware from "../../middleware/usersMiddleware.js";

const UserRouter = express.Router();

UserRouter.post(
  "/users/register",
  usersMiddleware.register,
  UsersController.register
);

UserRouter.post("/users/login", UsersController.logIn);

export default UserRouter;
