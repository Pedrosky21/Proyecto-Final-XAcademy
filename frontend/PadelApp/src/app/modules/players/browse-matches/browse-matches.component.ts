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
  hardcodedPartidos = [
    {
      idpartido: 1,
      nombre: 'Partido A',
      equipo: 'Mclaren',
      categoria: 'Avanzado',
      fecha: '2025-08-05',
      techada: true,
      turno_idturno: 1,
      materialPared_idmaterialpared: 2,
      materialSuelo_idmaterialSuelo: 3,
      estadopartido_idestadoturno: 1,
    },
    {
      idpartido: 2,
      nombre: 'Partido B',
      equipo: 'Mercedes',
      categoria: 'Intermedio',
      fecha: '2025-08-10',
      techada: false,
      turno_idturno: 2,
      materialPared_idmaterialpared: 1,
      materialSuelo_idmaterialSuelo: 2,
      estadopartido_idestadoturno: 2,
    },
    {
      idpartido: 2,
      nombre: 'Partido B',
      equipo: 'Mercedes',
      categoria: 'Intermedio',
      fecha: '2025-08-10',
      techada: false,
      turno_idturno: 2,
      materialPared_idmaterialpared: 1,
      materialSuelo_idmaterialSuelo: 2,
      estadopartido_idestadoturno: 2,
    },
  ];
  filters = {
    materialPiso: '',
    materialPared: '',
    techada: '',
  };

  filteredPartidos = [...this.hardcodedPartidos];

  techadaOptions: string[] = ['Si', 'No'];
  teams: any[] = [];

  ngOnInit() {}

  buscar() {
    this.filteredPartidos = this.hardcodedPartidos.filter((partido) => {
      const matchesFloor =
        !this.filters.materialPiso ||
        partido.materialSuelo_idmaterialSuelo === +this.filters.materialPiso;

      const matchesWall =
        !this.filters.materialPared ||
        partido.materialPared_idmaterialpared === +this.filters.materialPared;

      const matchesTechada =
        !this.filters.techada ||
        partido.techada === (this.filters.techada === 'true');

      return matchesFloor && matchesWall && matchesTechada;
    });
  }

  reiniciarFiltros() {
    this.filters = { materialPiso: '', materialPared: '', techada: '' };
    this.filteredPartidos = [...this.hardcodedPartidos];
  }
}
