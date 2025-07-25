import { UsuarioRepository } from "../adapters/repositories/UsuarioRepository";
import { NuevoUsuarioRequest } from "../core/dtos/requests/nuevoUsuarioRequest";
import Usuario from "../core/models/Usuario.model";

export class UsuarioService{
  usuarioRepository= new UsuarioRepository()

  createUsuario = async(nuevoUsuario: NuevoUsuarioRequest):Promise<Usuario>=>{
    return this.usuarioRepository.createUsuario(nuevoUsuario)
  }
}