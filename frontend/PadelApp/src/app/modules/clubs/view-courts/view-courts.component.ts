import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../../core/services/ClubService';
import { Club } from '../../../model/Club';
import { Court } from '../../../model/Court';

@Component({
  selector: 'app-view-courts',
  templateUrl: './view-courts.component.html',
  styleUrl: './view-courts.component.scss'
})
export class ViewCourtsComponent implements OnInit{

  constructor(
    private readonly clubService: ClubService
  ){

  }
  club:Club= new Club({})
  loadClub() {
    this.clubService.getClubByUserId().subscribe({
      next: (data: any) => {
        this.club=new Club(data)
        if(this.columns.length===0){
          this.setColumns()
        }
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      },
    });
  }

  diagramTurnModalOpen:boolean=false
  columns:string[]=[]
  setColumns() {
    const initialTime = Number(this.club?.openningTime.split(':')[0]) * 60;
    let currentTime = initialTime;
    const finalTime = Number(this.club?.closingTime.split(':')[0]) * 60;

    while (currentTime <= finalTime) {
      const hours = Math.floor(currentTime / 60)
        .toFixed()
        .padStart(2, '0');
      const minutes = (currentTime % 60).toFixed().padStart(2, '0');
      this.columns.push(hours + ':' + minutes);

      currentTime += 30;
    }
  }

  openDiagramTurnModal(){
    this.diagramTurnModalOpen=true
  }

  closeDiagramTurnModal(){
    this.diagramTurnModalOpen=false
    this.loadClub()
  }

  selectedCourt:Court|null=null
  setSelectedCourt(index:number){
    this.selectedCourt=this.club.courts?this.club.courts[index]:null
  }
  closeCourtModal(){
    this.selectedCourt=null
    this.loadClub()
  }
  ngOnInit(): void {
    this.loadClub()
  }
}
