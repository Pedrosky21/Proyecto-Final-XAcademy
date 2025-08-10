
export class Turn{
  id:number
  date:string
  startHour:string
  stateId:number
  playerName?:string
  stateName:string

  constructor(data:any){

    this.id=data.id
    const turnDate= new Date(data.startDateTime)
    this.date=turnDate.getDate().toString().padStart(2, '0')+"/"+(turnDate.getMonth()+1).toString().padStart(2, '0')+"/"+turnDate.getFullYear()
    this.startHour=(turnDate.getHours().toString().padStart(2, '0')+":"+turnDate.getMinutes().toString().padStart(2, '0')).padStart(2, '0');
    this.stateId=data.turnStateId
    this.stateName=data.turnState.name
    this.playerName=data.playerName
  }
}