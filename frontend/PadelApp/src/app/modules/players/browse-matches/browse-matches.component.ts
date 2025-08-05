import { Component } from '@angular/core';
import { TeamService } from '../../../core/services/TeamService';
import { PlayerService } from '../../../core/services/PlayerServices';
import { CategoryService } from '../../../core/services/CategoryService';
import { ClubService } from '../../../core/services/ClubService';

@Component({
  selector: 'app-browse-matches',

  templateUrl: './browse-matches.component.html',
  styleUrl: './browse-matches.component.scss',
})
export class BrowseMatchesComponent {
  constructor(
    private readonly teamService: TeamService,
    private readonly playerService: PlayerService,
    private readonly categoryService: CategoryService,
    private readonly clubService: ClubService
  ) {}

  filters = {
    materialPiso: '',
    materialPared: '',
    techada: '',
  };

  floorMaterials: any[] = [];
  wallMaterials: any[] = [];
  techadaOptions: string[] = ['Si', 'No'];
  teams: any[] = [];
  selectedTeam: any | null = null;

  ngOnInit() {
    this.loadMaterials();
    this.loadTeams(); // optional: if you want to show clubs from backend
  }

  loadMaterials() {
    this.clubService.getFloorMaterials().subscribe({
      next: (data) => (this.floorMaterials = data),
      error: (err) => console.error('Error loading floor materials', err),
    });

    this.clubService.getWallMaterial().subscribe({
      next: (data) => (this.wallMaterials = data),
      error: (err) => console.error('Error loading wall materials', err),
    });
  }

  loadTeams() {
    this.clubService.getClubByUserId().subscribe({
      next: (data) => (this.teams = data),
      error: (err) => console.error('Error loading teams', err),
    });
  }

  selectTeam(team: any) {
    this.selectedTeam = this.selectedTeam === team ? null : team;
  }

  buscar() {
    console.log('Buscando con filtros:', this.filters);
    // Optional: call backend with filters to retrieve filtered clubs
  }

  reiniciarFiltros() {
    this.filters = { materialPiso: '', materialPared: '', techada: '' };
    this.selectedTeam = null;
  }
}
