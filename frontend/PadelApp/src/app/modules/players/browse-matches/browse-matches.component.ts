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
import { TimeSlots } from '../../../model/TimeSlots';

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
          // For each match, sort timeSlots ascending by date and startTime
          this.filteredPartidos = (matches || []).map((m: Match) => {
            if (m.timeSlots && Array.isArray(m.timeSlots)) {
              m.timeSlots = m.timeSlots.slice().sort((a: any, b: any) => {
                // Normalize dates to timestamps (handles ISO yyyy-mm-dd)
                const dateA = a?.date ? new Date(a.date).getTime() : 0;
                const dateB = b?.date ? new Date(b.date).getTime() : 0;
                if (dateA !== dateB) return dateA - dateB;

                // If same date, try to sort by startTime (HH:mm or similar)
                const timeA = a?.startTime
                  ? this.parseTimeToMinutes(a.startTime)
                  : 0;
                const timeB = b?.startTime
                  ? this.parseTimeToMinutes(b.startTime)
                  : 0;
                return timeA - timeB;
              });
            }
            return m;
          });

        },
        error: (err) => {
          console.error('Error fetching matches', err);
        },
      });
  }

  getUniqueDates(timeSlots: TimeSlots[]): string[] {
    const dates = timeSlots.map((ts) => ts.date);
    return Array.from(new Set(dates));
  }
  private parseTimeToMinutes(time: string | undefined): number {
    if (!time) return 0;
    // Accept formats like "HH:mm", "H:mm", "HH:mm:ss"
    const parts = time.split(':').map((p) => parseInt(p, 10));
    if (!parts.length || isNaN(parts[0])) return 0;
    const hours = parts[0] || 0;
    const minutes = parts[1] || 0;
    return hours * 60 + minutes;
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

  onMatchAccepted(matchId: number) {
    this.onCloseAcceptMatchModal();

    this.filteredPartidos = this.filteredPartidos.filter(
      (m) => m.id !== matchId
    );

    this.buscar();
  }
  onCloseAcceptMatchModal() {
    this.showAcceptMatchModal = false;
    this.selectedMatch = null;
  }
}
