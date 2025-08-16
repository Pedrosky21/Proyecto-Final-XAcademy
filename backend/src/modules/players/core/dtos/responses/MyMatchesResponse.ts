import { Match } from "../../models/Match"

export class MyMatchesResponse{
  createdMatches: Match[]
  pendingMatches: Match[]
  confirmedMatches: Match[]

  constructor(data:any){
    this.createdMatches= data.createdMatches.map((match:any)=>new Match(match))
  }
}