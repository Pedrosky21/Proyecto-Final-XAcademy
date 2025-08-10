import { UserTypeEnum } from "../../../../auth/core/models/enums/UserTypeEnum"

export interface TurnState{
  setAsReserved(userType:UserTypeEnum):void

  setAsPaid(userType:UserTypeEnum):void

  cancelReserved(userType:UserTypeEnum):void

  cancelPayment(userType:UserTypeEnum):void
}