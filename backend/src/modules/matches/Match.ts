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
  rivalTeam:{
    teamName:string
    players:string[]
  }

  constructor(data:any,userId:number){
    this.id= data.id
    this.stateId= data.matchStateId
    this.preferecences={
      wallMaterialName:data.wallMaterialId,
      floorMaterialName: data.floorMaterialId,
      roofted:data.roofed===1?true:false
    }
    this.timeSlots=data.timeSlot
    const creatorTeam= data.MatchesTeams[0].team
    const playersTeams = data.MatchesTeams[0].team.PlayersTeams
    const playerName= playersTeams[0].player

    this.ownTeam={
      teamName:creatorTeam.name,
      partner:playerName.firstName+" "+playerName.lastName
    }

    const rivalTeam=data.RivalTeams[0].team
    const rival1 = rivalTeam.PlayersTeams[0].player
    const rival2 = rivalTeam.PlayersTeams[1].player

    const rival1Name = rival1.lastName + " " + rival1.firstName
    const rival2Name = rival2.lastName + " " + rival2.firstName
    this.rivalTeam={
      teamName:rivalTeam.name,
      players:[
        rival1Name,
        rival2Name
      ]
    }

  }

}