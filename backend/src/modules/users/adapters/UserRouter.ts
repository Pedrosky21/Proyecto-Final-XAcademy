import { Router } from "express";
import { UserController } from "./controllers/UsuarioController";

const userRouter = Router();
const userController = new UserController();
userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

export default userRouter;
