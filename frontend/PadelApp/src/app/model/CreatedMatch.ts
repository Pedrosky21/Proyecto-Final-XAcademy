import { FloorMaterial } from './FloorMaterial';
import { TimeSlots } from './TimeSlots';
import { WallMaterial } from './WallMaterial';

export class CreatedMatch {
  id?: number;
  ownTeam?: {
    name: string;
    partner: string;
  };
  rivalTeam?: {
    name: string;
    players: string[];
  };
  preferences?: {
    wallMaterial: WallMaterial;
    floorMaterial: FloorMaterial;
    roofed: number;
  };
  timeSlots?: TimeSlots[];
}
