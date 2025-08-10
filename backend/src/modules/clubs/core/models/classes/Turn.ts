import TurnModel from "../sequelize/Turn";
import { TurnCreatedState } from "../StatePatron/TurnCreatedState";
import { TurnPaidState } from "../StatePatron/TurnPaidState";
import { TurnReservedState } from "../StatePatron/TurnReservedState";
import { TurnState } from "../StatePatron/TurnStateInterface"

export enum TurnStateEnum{
  created=1,
  reserved=2,
  paid=3,
}

const strategyMap: Record<TurnStateEnum, TurnState> = {
  [TurnStateEnum.created]: new TurnCreatedState(),
  [TurnStateEnum.reserved]: new TurnReservedState(),
  [TurnStateEnum.paid]: new TurnPaidState(),
};
export class Turn{
  id:number
  state:TurnState

  constructor(turn: TurnModel){
    this.id=turn.id
    this.state= strategyMap[turn.turnStateId as TurnStateEnum]
  }
}