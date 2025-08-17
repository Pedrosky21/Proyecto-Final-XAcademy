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
    wallMaterialName: string;
    floorMaterialName: string;
    roofed: string;
  };

  turn?: {
    date: string;
    startHour: string;
    endHour: string;
  };
  club?: {
    address: string;
    name: string;
    turnPrice: string;
    cellNumber: string;
  };
  timeSlots?: TimeSlots[];

  constructor(data: any) {
    this.id = data.id;
    this.ownTeam = {
      name: data.ownTeam.teamName,
      partner: data.ownTeam.partner,
    };
    this.rivalTeam = {
      name: data.rivalTeam.teamName,
      players: data.rivalTeam.players,
    };
    this.preferences = {
      wallMaterialName: data.preferecences.wallMaterialName,
      floorMaterialName: data.preferecences.floorMaterialName,
      roofed: data.preferecences.roofted == 1 ? 'Si' : 'No',
    };
    this.turn = {
      date: data.turn?.date,
      startHour: data.turn?.startHour,
      endHour: data.turn?.endHour,
    };

    this.club = {
      address: data.club?.address,
      name: data.club?.name,
      turnPrice: data.club?.turnPrice,
      cellNumber: data.club?.cellNumber,
    };
    this.timeSlots = data.timeSlots
      ? data.timeSlots.map((element: any) => new TimeSlots(element))
      : [];
  }
}
