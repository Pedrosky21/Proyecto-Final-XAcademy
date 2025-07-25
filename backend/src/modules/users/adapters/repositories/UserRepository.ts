import { NewUserRequest } from "../../core/dtos/request/NewUserRequest";
import User from "../../core/models/UserModel";

export class UserRepository {
  createUser = async (newUser: NewUserRequest): Promise<User> => {
    const createdUser = await User.create({
      email: newUser.email,
      password: newUser.password,
    });
    return createdUser;
  };

  getAllUsers = async ():Promise<User[]> => {
    return await User.findAll()
  }

  getUserById = async (id:number):Promise<User|null> => {
    return await User.findByPk(id)
  } 
}
