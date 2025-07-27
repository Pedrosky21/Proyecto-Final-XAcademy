import { NextFunction, Request, Response } from "express";
import Club from "../../core/models/Club";
import Usuario from "../../../users/core/models/UserModel";
import { ClubService } from "../../services/ClubService";
import { NotFoundError } from "../../../../errors/NotFoundError";


export class ClubController{
  clubService = new ClubService();

  getClubById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const club = await this.clubService.getClubById(Number(id));
      if(!club){
        throw new NotFoundError("Club no encontrado")
      }
      res.status(201).json(club);
    } catch (error) {
      next(error)
    }
  };
}
// Obtener todos los clubes
export const getAllClubes = async (req: Request, res: Response) => {
  try {
    const clubes = await Club.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
        },
      ],
    });
    res.json(clubes);
  } catch (error) {
    console.error("Error fetching jugadores:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Crear un club
export const createClub = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      horaInicio,
      horaCierre,
      nombreResponsable,
      apellidoResponsable,
      telefonoClub,
      precioTurno,
      reglaCancelacion,
      reglaAdmision,
      cantCanchas,
      usuario_id,
      direccion,
    } = req.body;

    if (
      !nombre ||
      !horaInicio ||
      !horaCierre ||
      !nombreResponsable ||
      !apellidoResponsable ||
      !telefonoClub ||
      !precioTurno ||
      !reglaCancelacion ||
      !reglaAdmision ||
      !cantCanchas ||
      !usuario_id ||
      !direccion
    ) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const nuevoClub = await Club.create({
      nombre,
      horaInicio,
      horaCierre,
      nombreResponsable,
      apellidoResponsable,
      telefonoClub,
      precioTurno,
      reglaCancelacion,
      reglaAdmision,
      cantCanchas,
      usuario_id,
      direccion,
    });
  } catch (error) {
    console.error("Error fetching jugadores:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
