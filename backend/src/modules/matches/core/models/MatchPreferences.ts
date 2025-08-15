export class MatchPreferences{
  roofted:number
  wallMaterialId?:number
  floorMaterialId?:number
  timeSlots?:{
    startHour:string,
    endHour:string
  }[]

  constructor(data:any){
    // Puede venir como data.roofed o data.dataValues.roofed
    this.roofted = data.roofed ?? data.dataValues?.roofed;

    // MaterialPared y MaterialSuelo pueden venir como propiedades directas o dentro de dataValues
    const wallMaterial = data.MaterialPared ?? data.dataValues?.MaterialPared;
    const floorMaterial = data.MaterialSuelo ?? data.dataValues?.MaterialSuelo;

    this.wallMaterialId = wallMaterial?.id ?? wallMaterial?.dataValues?.id;
    this.floorMaterialId = floorMaterial?.id ?? floorMaterial?.dataValues?.id;

    // timeSlots puede venir como propiedad directa o dentro de dataVa
    // lues
    const slots = data.timeSlots ?? data.dataValues?.timeSlots;
    this.timeSlots = Array.isArray(slots)
  ? slots.map((slot: any) => {
      const s = slot.startTime ? slot : slot.dataValues;
      const e = slot.endTime ? slot : slot.dataValues;

      return {
        startHour: `${s.date} ${s.startTime}`,
        endHour: `${e.date} ${e.endTime}`
      };
    })
  : [];
  }
    
  }
