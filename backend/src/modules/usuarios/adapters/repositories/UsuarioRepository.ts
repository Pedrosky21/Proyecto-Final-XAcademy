import { NuevoUsuarioRequest } from "../../core/dtos/requests/nuevoUsuarioRequest";
import Usuario from "../../core/models/Usuario.model";

export class UsuarioRepository{

  createUsuario = async(newUsuario: NuevoUsuarioRequest):Promise<Usuario>=>{
    return await Usuario.create({
            email:newUsuario.email,
            password:newUsuario.password
    });

  }

}