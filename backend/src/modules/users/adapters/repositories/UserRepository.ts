import { NewUserRequest } from "../../core/dtos/request/NewUserRequest";
import User from "../../core/models/UserModel";

export class UserRepository {
  createUser = async (newUser: NewUserRequest): Promise<User> => {
    const createdUser = await User.create({
      email: newUser.email,
      password: newUser.password,
      userType: "Pendiente",
    });
    return createdUser;
  };

  setUserType = async (
    id: number,
    userType: "Jugador" | "Club"
  ): Promise<User | null> => {
    const user = await User.findByPk(id);

    if (!user) {
      return null; // o lanzar error
    }

    user.userType = userType;
    await user.save();

    return user;
  };

  getAllUsers = async (): Promise<User[]> => {
    return await User.findAll();
  };

  getUserById = async (id: number): Promise<User | null> => {
    return await User.findByPk(id);
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    return await User.findOne({ where: { email } });
  };
}
