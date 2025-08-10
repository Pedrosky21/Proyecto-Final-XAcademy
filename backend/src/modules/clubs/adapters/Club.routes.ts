import {Router} from 'express';
import { ClubController } from './controllers/Club.controller';
import { verifyToken } from '../../../middleware/authMiddleware';


const clubRouter = Router();
const clubController= new ClubController()
clubRouter.post("/diagram-turns", verifyToken,clubController.diagramTurns)
clubRouter.post("/", verifyToken, clubController.createClub)
clubRouter.post("/pay-turn",verifyToken,clubController.setTurnAsPaid)
clubRouter.post("/reserve-turn",verifyToken,clubController.setTurnAsReserved)
clubRouter.post("/cancel-reservation",verifyToken,clubController.cancelReservation)
clubRouter.post("/cancel-payment",verifyToken, clubController.cancelPayment)
clubRouter.get("/", verifyToken,clubController.getClubByUserId)
clubRouter.get("/court-turns",verifyToken,clubController.getTurnsByWeek)

export default clubRouter;