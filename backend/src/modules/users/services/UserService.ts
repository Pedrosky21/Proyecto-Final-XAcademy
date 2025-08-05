import { Transaction } from "sequelize";
import { UserRepository } from "../../auth/adapters/repositories/UserRepository";
import { NewUserRequest } from "../../auth/core/dtos/request/NewUserRequest";
import User from "../../auth/core/models/UserModel";


export class UserService {
  userRepository = new UserRepository();

  createUser = async (newUser: NewUserRequest): Promise<any> => {
    return await this.userRepository.createUser(newUser);
  };

  setUserType = async (id:number, userType: 'Jugador'|'Club',transaction:Transaction): Promise<any> => {
    return await this.userRepository.setUserType(id, userType,transaction);
  }

  getUserById = async (id: number): Promise<User | null> => {
    return await this.userRepository.getUserById(id);
  };

  getUserByEmail = async(email: string): Promise<User | null> => {
    return await this.userRepository.getUserByEmail(email)
  }
}
