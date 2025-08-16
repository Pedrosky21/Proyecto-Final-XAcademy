export class Match{
  id:number
  stateId:number
  preferecences:{
    wallMaterialName:string
    floorMaterialName:string
    roofted:boolean
  }
  timeSlots:any[]
  ownTeam: {
    teamName:string
    partner:string
  }
  rivalTeam?:{
    teamName:string
    players:string[]
  }

  constructor(data:any,userId:number){
    this.id= data.id
    this.stateId= data.matchStateId
    this.preferecences={
      wallMaterialName:data.wallMaterialName,
      floorMaterialName: data.floorMaterialName,
      roofted:data.roofed===1?true:false
    }
    this.timeSlots=data.timeSlot
    const creatorTeam= data.MatchesTeam.find((team:any)=>team.isCreator===1)
    const playerName= data.creatorTeam.playersTeams.find((player:any)=>player.userId!==userId)
    this.ownTeam={
      teamName:creatorTeam.name,
      partner:playerName.firstName+" "+playerName.lastName
    }

    const rivalTeam=data.MatchesTeam.find((team:any)=>team.isCreator===0)
    const rivals:string[]=rivalTeam.PlayersTeams.map((player:any)=>player.lastName + " " + player.firstName)
    this.rivalTeam={
      teamName:rivalTeam.name,
      players:rivals
    }
    
  }

}