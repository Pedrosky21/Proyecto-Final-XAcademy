import { ConflictError } from "../../../../../errors/ConflictError";
import { UnauhtorizedError } from "../../../../../errors/UnauthorizedError";
import { UserTypeEnum } from "../../../../auth/core/models/enums/UserTypeEnum";
import { TurnState } from "./TurnStateInterface";


export class TurnReservedState implements TurnState{

   setAsReserved=(userType:UserTypeEnum):void=>{
    if(userType===UserTypeEnum.Pendent){
      throw new ConflictError("No se puede marcar un turno reservado como reservado")
    }
  }
  
   setAsPaid=(userType:UserTypeEnum):void=>{
    if(userType!==UserTypeEnum.Club){
      throw new ConflictError("El usuario no tiene permisos para marcar el turno como pagado")
    }
  }

  cancelReserved=(userType:UserTypeEnum):void=>{
    if(userType===UserTypeEnum.Pendent){
      throw new UnauhtorizedError("El usuario no tiene permisos para cancelar la reserva")
    }
  }

  cancelPayment=(userType:UserTypeEnum):void=>{
    throw new ConflictError("No se puede cancelar el pago si el turno no fue pagado")
  }
}