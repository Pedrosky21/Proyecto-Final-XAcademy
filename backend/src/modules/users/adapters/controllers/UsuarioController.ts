import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/UserService";
import { NewUserRequest } from "../../core/dtos/request/NewUserRequest";
import { BadRequestError } from "../../../../errors/BadRequestError";

export class UserController {
  userService = new UserService();

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const newUserRequest = new NewUserRequest(req.body);

      const error: string | null = newUserRequest.validate();

      if (error) throw new BadRequestError(error);

      const newUser = await this.userService.createUser(
        newUserRequest
      );

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        const users = await this.userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
  };

  getUserById = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        const {id} = req.params
        const user = await this.userService.getUserById(Number(id))
        res.json(user)
    } catch (error) {
        next(error)
    }
  }
}
