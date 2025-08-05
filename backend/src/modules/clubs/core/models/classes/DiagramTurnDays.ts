export class DiagramTurnWeekDay{
  weekDay:number
  turns:string[]

  constructor(data:any){
    this.weekDay=data.weekDay
    this.turns= data.turns
  }

  validate(court:number): string | null {
    if(!this.weekDay|| typeof(this.weekDay)!=="number"|| this.weekDay<0 || this.weekDay>6){
      return "Todos los weekDay tienen que ser un número entre 0 y 6"
    }
    if(!Array.isArray(this.turns)){
      return `El dia ${this.weekDay} de la cancha ${court} no tiene turns que sea un array`
    }

    if(this.turns.length>0){
      this.turns.sort();
      let i = 0;

      const invalidHours = this.turns.some(
        (turn) => !turn || typeof turn !== "string" || this.verifyHours(turn)
      );
      if (invalidHours) {
        return "Todas las horas debe ser una hora valida";
      }

      while (i < this.turns.length - 1) {
        const firstTurnTime: string[] = this.turns[i].split(":");
        const secondTurnTime: string[] = this.turns[i + 1].split(":");
        if (
          !(
            Number(secondTurnTime[0]) - Number(firstTurnTime[0]) >= 2 ||
            (Number(secondTurnTime[0]) - Number(firstTurnTime[0]) === 1 &&
              firstTurnTime[1] === "00" &&
              secondTurnTime[1] === "30")
          )
        ) {
          return `Existen turnos superpuestos en el dia ${this.weekDay} de la cancha ${court}`;
        }
      }
    }
    return null;
  }

  verifyHours(hours: string): boolean {
    const splitedHour = hours.split(":");
    const isInvalid: boolean =
      Number(splitedHour[0]) < 0 ||
      Number(splitedHour[0]) > 24 ||
      Number(splitedHour[1]) < 0 ||
      Number(splitedHour[1]) > 59;
    return isInvalid;
  }
}