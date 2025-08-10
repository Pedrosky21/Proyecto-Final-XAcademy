import {Router} from 'express';
import { ClubController } from './controllers/Club.controller';
import { verifyToken } from '../../../middleware/authMiddleware';


const clubRouter = Router();
const clubController= new ClubController()
clubRouter.get("/", verifyToken,clubController.getClubByUserId)
clubRouter.post("/diagram-turns", verifyToken,clubController.diagramTurns)
clubRouter.post("/", verifyToken, clubController.createClub)
clubRouter.get("/court-turns",verifyToken,clubController.getTurnsByWeek)
clubRouter.post("/pay-turn",verifyToken,clubController.setTurnAsPaid)
clubRouter.post("/reserve-turn",verifyToken,clubController.setTurnAsReserved)
clubRouter.post("/cancel-reservation",verifyToken,clubController.cancelReservation)
clubRouter.post("/cancel-payment",verifyToken, clubController.cancelPayment)

export default clubRouter;