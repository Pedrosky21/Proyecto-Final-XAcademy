import { UserRepository } from "../adapters/repositories/UserRepository";
import { NewUserRequest } from "../core/dtos/request/NewUserRequest";
import User from "../core/models/UserModel";

export class UserService {
  userRepository = new UserRepository();

  createUser = async (newUser: NewUserRequest): Promise<any> => {
    return await this.userRepository.createUser(newUser);
  };

  setUserType = async (id:number, userType: 'Jugador'|'Club'): Promise<any> => {
    return await this.userRepository.setUserType(id, userType);
  }

  getAllUsers = async (): Promise<any> => {
    return await this.userRepository.getAllUsers();
  };

  getUserById = async (id: number): Promise<User | null> => {
    return await this.userRepository.getUserById(id);
  };

  getUserByEmail = async(email: string): Promise<User | null> => {
    return await this.userRepository.getUserByEmail(email)
  }
}
