
export class NewClubRequest{
  name:string
  address:string
  cellNumber:string
  responsableFirstName:string
  responsableLastName:string
  turnPrice:number
  openningTime:string
  closingTime:string
  admisionRules:string
  cancelationRules:string
  courts:string

  constructor(){
    this.name = '';
    this.address = '';
    this.cellNumber = '';
    this.responsableFirstName = '';
    this.responsableLastName = '';
    this.turnPrice = 0;
    this.openningTime = '';
    this.closingTime = '';
    this.admisionRules = '';
    this.cancelationRules = '';
    this.courts = '';
  }
}