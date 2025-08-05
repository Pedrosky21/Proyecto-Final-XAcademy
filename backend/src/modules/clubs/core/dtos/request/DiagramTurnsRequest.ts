import { DiagramTurnCourt } from "../../models/classes/DiagramTurnCourts";

export class DiagramTurnRequest {
  courts: DiagramTurnCourt[]
  month:number
  year:number

  constructor(data: any) {
    this.courts = data.map((court:any)=> new DiagramTurnCourt(court));
    this.month= data.month
    this.year=data.year
  }

  validate(): string | null {
    if(!this.year || typeof(this.year)!=="number"){
      return "El year debe ser un año válido"
    }

    if(!this.month || typeof(this.month)!=="number"|| this.month<0 || this.month>11){
      return "El month debe ser un número entre 0 y 11"
    }
    const currentDate= new Date()
    if(currentDate.getFullYear()>this.year){
      return "No se pueden diagramar turnos para un año que ya paso"
    }
    if(currentDate.getFullYear()===this.year &&currentDate.getMonth()>this.month){
      return "El month debe representar un mes que ya paso"
    }

    if (!this.courts) {
      return "Courts debe ser un array de canchas dia y turnos validos";
    }
    const seenCourtId = new Set<number>();
    for (const court of this.courts){
      if(seenCourtId.has(court.id)){
        return `La cancha ${court.id} esta repetida`
      }
      seenCourtId.add(court.id)
      const validationError= court.validate()
      if(validationError){
        return validationError
      }
    }

    return null;
  }

}
