import { Router } from "express";
import { UserController } from "./controllers/UsuarioController";
import { verifyToken } from "../../../middleware/authMiddleware";


const userRouter = Router();
const userController = new UserController();
userRouter.post('/choose-type', verifyToken, userController.setUserType);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

export default userRouter;
