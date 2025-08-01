import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/UserService";

export class UserController {
  userService = new UserService();

  setUserType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {id} = req.params
      const {userType} = req.body;
      const user = await this.userService.setUserType(Number(id), userType);

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(Number(id));
      res.json(user);
    } catch (error) {
      next(error);
    }
  };
}
