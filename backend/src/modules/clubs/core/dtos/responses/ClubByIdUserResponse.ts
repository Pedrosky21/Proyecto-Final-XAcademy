import { CourtByIdUser } from "../../models/ClubByIdUserCourt"

export class ClubByIdUserResponse{
  openningTime:string
  closingTime:string
  courts:CourtByIdUser[]

  constructor(data:any){
    this.closingTime=data.clossingTime
    this.openningTime=data.openingTime
    this.courts= data.courts.map((court:any)=> new CourtByIdUser(court))
  }

}