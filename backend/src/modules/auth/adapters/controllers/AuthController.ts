import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService";

export class AuthController {
  private authService = new AuthService();

  register = async(req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const {email, password} = req.body;
        const result = await this.authService.register(email, password);

        res.json(result);
    } catch (error) {
        next(error);
    }
  }

  login = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
