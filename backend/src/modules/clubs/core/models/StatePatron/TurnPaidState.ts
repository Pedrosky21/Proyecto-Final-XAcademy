import { ConflictError } from "../../../../../errors/ConflictError";
import { UnauhtorizedError } from "../../../../../errors/UnauthorizedError";
import { UserTypeEnum } from "../../../../auth/core/models/enums/UserTypeEnum";
import { TurnState } from "./TurnStateInterface";


export class TurnPaidState implements TurnState{

   setAsReserved=(userType:UserTypeEnum):void=>{
    throw new ConflictError("No se puede marcar el turno como reservado")
  }
  
   setAsPaid=(userType:UserTypeEnum):void=>{
      throw new ConflictError("No se puede marcar un turno ya pagado como pago")
  }

  cancelReserved=(userType:UserTypeEnum):void=>{
    throw new UnauhtorizedError("No se puede cancelar la reserva de un turno paco")
  }

  cancelPayment=(userType:UserTypeEnum):void=>{
    if(userType!==UserTypeEnum.Club){
      throw new ConflictError("El usuario no puede cancelar el pago de este turno")
    }
  }
}