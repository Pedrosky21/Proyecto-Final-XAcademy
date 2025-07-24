import { Router } from "express";
import { createJugador, getAllJugadores } from "../modules/jugadores/adapters/controllers/Jugador.controller";

const router = Router();
router.get('/', getAllJugadores);
router.post('/', createJugador);

export default router;
