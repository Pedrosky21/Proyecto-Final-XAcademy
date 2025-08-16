import { TableTurn } from '../components/turn-table/types/TableTurn';
import { Turn } from './Turn';

export class Court {
  id: number;
  index: number;
  wallMaterialId: number;
  wallMaterialName: string;
  floorMaterialId: number;
  floorMaterialName: string;
  roofted: string;
  availableTurns: number;
  reservedTurns: number;
  paidTurns: number;
  totalTurns:number

  constructor(data: any, index: number) {
    this.id = data.id;
    this.index = index;
    this.wallMaterialId = data.wallMaterialId??"-";
    this.wallMaterialName = data.wallMaterialName??"-";
    this.floorMaterialId = data.floorMaterialId??"-";
    this.floorMaterialName = data.floorMaterialName??"-";
    this.roofted = data.roofted ? 'SI' : 'NO';
    this.availableTurns = data.availableTurns;
    this.reservedTurns = data.reservedTurns;
    this.paidTurns = data.paidTurns;
    this.totalTurns=data.totalTurns
  }

  
}
