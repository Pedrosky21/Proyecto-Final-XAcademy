import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../../core/services/ClubService';
import { Club } from '../../../model/Club';

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
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      },
    });
  }

  diagramTurnModalOpen:boolean=false

  openDiagramTurnModal(){
    this.diagramTurnModalOpen=true
  }

  closeDiagramTurnModal(){
    this.diagramTurnModalOpen=false
  }

  ngOnInit(): void {
    this.loadClub()
  }
}
