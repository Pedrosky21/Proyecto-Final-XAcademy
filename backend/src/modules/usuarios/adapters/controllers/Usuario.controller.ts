import { Request, Response } from "express";
import Usuario from "../../core/models/Usuario.model";


// Obtener todos los usuarios
export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);

} catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


// Crear un usuario
export const createUsuario = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Faltaron campos obligatorios"});
        }

        const nuevoUsuario = await Usuario.create({
            email,
            password
        });

        res.status(201).json(nuevoUsuario);

    } catch (error) {
        console.error("Error creando usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    }
}

