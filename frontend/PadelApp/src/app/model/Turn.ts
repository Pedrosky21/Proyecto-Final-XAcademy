
export class Turn{
  id:number
  date:string
  startHour:string
  stateId:number
  stateName:string

  constructor(data:any){

    this.id=data.id
    const turnDate= new Date(data.startDateTime)
    this.date=turnDate.getDate().toString().padStart(2, '0')+"/"+(turnDate.getMonth()+1).toString().padStart(2, '0')+"/"+turnDate.getFullYear()
    this.startHour=(turnDate.getHours().toString().padStart(2, '0')+":"+turnDate.getMinutes().toString().padStart(2, '0')).padStart(2, '0');
    this.stateId=3
    this.stateName=data.turnState.name
  }
}