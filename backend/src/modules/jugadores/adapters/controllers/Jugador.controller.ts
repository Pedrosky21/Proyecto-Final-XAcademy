import { Request, Response } from "express";
import Jugador from "../../core/models/Jugador.model";
import Usuario from "../../../usuarios/core/models/Usuario.model";
import Posicion from "../../../posiciones/core/models/Posicion.model";
import Categoria from "../../../categorias/core/models/Categoria.model";


// Obtener jugadores
export const getAllJugadores = async (req: Request, res: Response) => {
  try {
    const jugadores = await Jugador.findAll({
      include: [{ model: Usuario }],
    });
    res.json(jugadores);

  } catch (error) {
    console.error("Error fetching jugadores:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


// Crear jugador
export const createJugador = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellido,
      fechaNac,
      telefono,
      urlFoto,
      usuario_id,
      categoria_id,
      posicion_id,
    } = req.body;

    if (!nombre || !apellido || !fechaNac || !telefono) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const posicion = await Posicion.findByPk(posicion_id);
    if (!posicion) {
      return res.status(404).json({ message: "Posicion no encontrada" });
    }

    const categoria = await Categoria.findByPk(categoria_id);
    if (!categoria) {
      return res.status(400).json({ message: "Categoria no encontrada" });
    }

    const nuevoJugador = await Jugador.create({
      nombre,
      apellido,
      fechaNac,
      telefono,
      urlFoto,
      usuario_id,
      categoria_id,
      posicion_id,
    });

    res.status(201).json(nuevoJugador);
  } catch (error) {
    console.error("Error creando jugador:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

