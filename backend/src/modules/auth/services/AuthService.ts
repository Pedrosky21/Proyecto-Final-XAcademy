import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { UserRepository } from "../../users/adapters/repositories/UserRepository";

export class AuthService {
    private userRepository = new UserRepository()

    login = async (email:string, password:string) => {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) throw new Error('Usuario no encontrado');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Contraseña incorrecta');

        const token = this.generateToken(user.id, user.email);

        return { token, user };
    }

    register = async (email:string, password:string) => {
        const existingUser = await this.userRepository.getUserByEmail(email);
        if (existingUser) throw new Error('El usuario ya existe');

        const hashedPassword = await bcrypt.hash(password, 10);
        // necesito el validate si o si por NewUserRequest
        const newUser = await this.userRepository.createUser({email: email, password: hashedPassword, userType:'Pendiente', validate: () => null});

        const token = this.generateToken(newUser.id, newUser.email);

        return {token, user: newUser};
    }

    private generateToken(id:number, email:string) {
        return jwt.sign({id, email}, process.env.JWT_SECRET!, {expiresIn: '1h'});
    }
}
