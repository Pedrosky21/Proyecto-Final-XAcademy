import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { verifyToken } from "../../../middleware/authMiddleware";


const userRouter = Router();
const userController = new UserController();
userRouter.patch('/choose-type/:id', userController.setUserType);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

export default userRouter;
