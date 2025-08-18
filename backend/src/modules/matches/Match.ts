export class Match {
  id: number;
  stateId: number;
  preferecences: {
    wallMaterialName: string;
    floorMaterialName: string;
    roofted: boolean;
  };
  timeSlots: any[];
  ownTeam: {
    teamName: string;
    partner: string;
  };
  rivalTeam: {
    teamName?: string;
    players?: string[];
  };
  turn?:{
    date:string
    startHour:string,
    endHour:string,
  }
  club?:{
    name:string
    address:string
    turnPrice:string,
    cellNumber:string
  }



  constructor(data: any, userId: number) {
    this.id = data.id;
    this.stateId = data.matchStateId;
    this.preferecences = {
      wallMaterialName: data.wallMaterial.name,
      floorMaterialName: data.floorMaterial.name,
      roofted: data.roofed === 1 ? true : false,
    };
    this.timeSlots = data.timeSlots;
    const creatorTeam = data.MatchesTeams[0].team;
    const playersTeams = data.MatchesTeams[0].team.PartnerTeams;
    const playerName = playersTeams[0].player;

    this.ownTeam = {
      teamName: creatorTeam.name,
      partner: playerName.firstName + " " + playerName.lastName,
    };

    const rivalTeam = data.RivalTeams[0] ? data.RivalTeams[0].team : null;
    const rival1 = rivalTeam ? rivalTeam.PlayersTeams[0].player : null;
    const rival2 = rivalTeam ? rivalTeam.PlayersTeams[1].player : null;

    const rival1Name = rival1 ? rival1.lastName + " " + rival1.firstName : "";
    const rival2Name = rival2 ? rival2.lastName + " " + rival2.firstName : "";
    this.rivalTeam = {
      teamName: rivalTeam ? rivalTeam.name : null,
      players: [rival1Name, rival2Name],
    };
    this.turn=data.turn?{
      date:new Date(data.turn.startDateTime).toISOString().split("T")[0],
      startHour:new Date(data.turn.startDateTime).getHours()+":"+new Date(data.turn.startDateTime).getMinutes().toString().padStart(2,"0"),
      endHour: new Date(data.turn.endDateTime).getHours()+":"+new Date(data.turn.endDateTime).getMinutes().toString().padStart(2,"0"),
    }:undefined
    this.club=data.turn?.court?.club?{
      address:data.turn.court.club.address,
      name:data.turn.court.club.name,
      turnPrice: data.turn.court.club.turnPrice,
      cellNumber: data.turn.court.club.cellNumber
    }:undefined
  }
}
