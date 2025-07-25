import { UserRepository } from "../adapters/repositories/UserRepository";
import { NewUserRequest } from "../core/dtos/request/NewUserRequest";
import User from "../core/models/UserModel";

export class UserService {
  userRepository = new UserRepository();

  createUser = async (newUser: NewUserRequest): Promise<any> => {
    return await this.userRepository.createUser(newUser);
  };

  getAllUsers = async (): Promise<any> => {
    return await this.userRepository.getAllUsers();
  };

  getUserById = async (id: number): Promise<User | null> => {
    return await this.userRepository.getUserById(id);
  };
}
