import { CourtByIdUser } from "../../models/classes/ClubByIdUserCourt";
import { TurnStateEnum } from "../../models/enum/TurnStartEnum";
import Club from "../../models/sequelize/Club";

export class ClubByUserIdResponse {
  id: number;
  name: string;
  address: string;
  openningTime: string;
  closingTime: string;
  responsableFullName: string;
  cellNumber: number;
  turnPrice: number;
  admisionRules: string;
  cancelationRules: string;
  courts: CourtByIdUser[];

  constructor(club: any) {
    this.id = club.id;
    this.name = club.name;
    this.address = club.address;
    this.openningTime = club.openningTime;
    this.closingTime = club.closingTime;
    this.responsableFullName = `${club.responsableFirstName} ${club.responsableLastName}`;
    this.cellNumber = club.cellNumber;
    this.turnPrice = club.turnPrice;
    this.admisionRules = club.admisionRules;
    this.cancelationRules = club.cancelationRules;
    this.courts = (club.courts || []).map((court: any) => {
      let availableTurns=0
      let reservedTurns=0
      let paidTurns=0;
      
      (court.turns || []).forEach((turn: any) => {
        const state:string= turn.turnState?.name;

        if(state===TurnStateEnum.Disponible)availableTurns++
        if(state===TurnStateEnum.Reservado)reservedTurns++
        if(state===TurnStateEnum.Cobrado)paidTurns++
        
      });
      return new CourtByIdUser({
        id: court.id,
        number: court.number,
        wallMaterial: court.wallMaterial?.name,
        floorMaterialName: court.floorMaterial?.name,
        roofted: court.roofed===0?true:false,
        availableTurns,
        reservedTurns,
        paidTurns,
      });
    });
  }
}
