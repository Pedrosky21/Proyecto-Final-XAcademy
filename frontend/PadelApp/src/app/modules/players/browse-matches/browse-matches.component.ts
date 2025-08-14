import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../core/services/TeamService';
import { PlayerService } from '../../../core/services/PlayerServices';
import { CategoryService } from '../../../core/services/CategoryService';
import { ClubService } from '../../../core/services/ClubService';
import { MatchService } from '../../../core/services/MatchService';
import { Match } from '../../../model/Match';
import { FloorMaterial } from '../../../model/FloorMaterial';
import { WallMaterial } from '../../../model/WallMaterial';
import { FloorMaterialService } from '../../../core/services/FloorMaterialService';
import { WallMaterialService } from '../../../core/services/WallMaterialService';
import { AuthService } from '../../../core/services/AuthService';

@Component({
  selector: 'app-browse-matches',

  templateUrl: './browse-matches.component.html',
  styleUrl: './browse-matches.component.scss',
})
export class BrowseMatchesComponent implements OnInit {
  constructor(
    private readonly matchService: MatchService,
    private readonly floorMaterialService: FloorMaterialService,
    private readonly wallMaterialService: WallMaterialService
  ) {}

  selectedMatch: Match | null = null;
  showAcceptMatchModal = false;
  filters = {
    materialPiso: '',
    materialPared: '',
    techada: '',
  };
  filteredPartidos: Match[] = [];
  floorMaterials: FloorMaterial[] = [];
  wallMaterials: WallMaterial[] = [];

  page = 1;
  limit = 30;
  totalMatches = 0;

  ngOnInit() {
    this.buscar();
    this.loadMaterials();
  }

  loadMaterials() {
    this.wallMaterialService.getWallMaterials().subscribe((materials) => {
      this.wallMaterials = materials;
    });

    this.floorMaterialService.getFloorMaterials().subscribe((materials) => {
      this.floorMaterials = materials;
    });
  }

  buscar() {
    const roofed =
      this.filters.techada !== ''
        ? this.filters.techada === 'true'
          ? 1
          : 0
        : null;
    const wallMaterial = this.filters.materialPared
      ? Number(this.filters.materialPared)
      : null;
    const floorMaterial = this.filters.materialPiso
      ? Number(this.filters.materialPiso)
      : null;

    this.matchService
      .getMatches(this.limit, this.page, roofed, wallMaterial, floorMaterial)
      .subscribe({
        next: (matches) => {
          this.filteredPartidos = matches;
          console.log('Filtered matches:', this.filteredPartidos);
        },
        error: (err) => {
          console.error('Error fetching matches', err);
        },
      });
  }

  reiniciarFiltros() {
    this.filters = { materialPiso: '', materialPared: '', techada: '' };
    this.page = 1;
    this.buscar();
  }
  openAcceptMatchModal(match: Match) {
    this.selectedMatch = match;

    this.showAcceptMatchModal = true;
  }

  onCloseAcceptMatchModal() {
    this.showAcceptMatchModal = false;
    this.selectedMatch = null;
  }
}
