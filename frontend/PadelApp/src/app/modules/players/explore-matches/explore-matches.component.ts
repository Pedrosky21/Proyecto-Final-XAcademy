import { Component } from '@angular/core';
import { ModalIconEnum } from '../../../core/layouts/confirmation-modal/models/ModalProps';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../../../core/services/PlayerServices';

import { ConfirmationModalService } from '../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../core/layouts/loading-screen/service/loadingService';
import { TeamService } from '../../../core/services/TeamService';
import { NewTeamRequest } from '../../../model/NewTeamRequest';
import { AuthService } from '../../../core/services/AuthService';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CreatedMatch } from '../../../model/CreatedMatch';
import { WallMaterial } from '../../../model/WallMaterial';
import { FloorMaterial } from '../../../model/FloorMaterial';
import { TimeSlots } from '../../../model/TimeSlots';

@Component({
  selector: 'app-explore-matches',

  templateUrl: './explore-matches.component.html',
  styleUrl: './explore-matches.component.scss',
})
export class ExploreMatchesComponent {
  constructor(
    private playerService: PlayerService,
    private readonly fb: FormBuilder,
    private confirmationModalService: ConfirmationModalService,
    private loadingScreenService: loadingScreenService,
    private teamService: TeamService,
    private authService: AuthService
  ) {
    this.matchGroup = this.fb.group({
      selectedTeam: ['', Validators.required],
      floorMaterialId: ['', Validators.required],
      wallMaterialId: ['', Validators.required],
      roofed: ['', Validators.required],
    });

    this.createTeamForm = this.fb.group({
      selectedPlayer: [null, Validators.required],
      teamName: ['', [Validators.required, Validators.minLength(3)]],
      teamDescription: ['', [Validators.minLength(5)]],
    });
  }
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
    {
      idpartido: 3,
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
      idpartido: 4,
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
      idpartido: 5,
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
      idpartido: 6,
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
      idpartido: 6,
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
      idpartido: 6,
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
      idpartido: 6,
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
      idpartido: 6,
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
  private searchSubject = new Subject<string>();
  matchGroup: FormGroup;
  createTeamForm!: FormGroup;

  showCreateTeamModal = false;
  showCreateMatchModal = false;
  searchTerm = '';

  players: any[] = [];
  teams: any[] = [];

  ngOnInit() {}
  loadUserTeams() {
    console.log('Calling getTeamsByPlayerId()');
    this.playerService.getTeamsByPlayerId().subscribe({
      next: (teams) => {
        this.teams = teams;
        console.log('User teams loaded:', teams);
      },
      error: (err) => {
        console.error('Error loading user teams:', err);
      },
    });
  }

  openCreateMatchModal() {
    this.loadUserTeams();
    this.showCreateMatchModal = true;
  }

  closeCreateMatchModal() {
    this.showCreateMatchModal = false;
  }

  openCreateTeamModal() {
    this.createTeamForm.reset();
    this.showCreateTeamModal = true;
  }

  closeCreateTeamModal() {
    this.showCreateTeamModal = false;
  }

  onConfirmMatchModal() {
    if (this.matchGroup.invalid) {
      this.matchGroup.markAllAsTouched();
      return;
    }
    this.closeCreateMatchModal();
    const formValues = this.matchGroup.value;

    this.confirmationModalService.openModal({
      title: '¿Confirmar partido?',
      message: `¿Desea crear el partido con el equipo ${formValues.selectedTeam}?`,
      icon: ModalIconEnum.ok,
      accept: {
        title: 'Confirmar',
        action: () => {
          this.confirmationModalService.closeModal();

          this.loadingScreenService.showLoadingScreen('Creando Partido...');

          setTimeout(() => {
            this.loadingScreenService.showLoadingScreen(null);
          }, 2000);

          this.confirmationModalService.openModal({
            icon: ModalIconEnum.ok,
            title: 'Partido creado con exito',
            message: 'Se ha creado el partido correctamente.',
            accept: {
              title: 'Aceptar',
              action: () => {
                this.confirmationModalService.closeModal();
              },
            },
          });
        },
      },
      reject: {
        title: 'Cancelar',
        action: () => {
          this.confirmationModalService.closeModal();
        },
      },
    });
  }

  onConfirmTeamModal() {
    if (this.createTeamForm.invalid) {
      this.createTeamForm.markAllAsTouched();
      return;
    }

    const { selectedPlayer, teamName, teamDescription } =
      this.createTeamForm.value;

    this.closeCreateTeamModal();

    this.confirmationModalService.openModal({
      title: '¿Confirmar equipo?',
      message: `¿Desea crear el equipo ${teamName} con ${selectedPlayer?.fullName}?`,
      icon: ModalIconEnum.ok,
      accept: {
        title: 'Confirmar',
        action: () => {
          this.confirmationModalService.closeModal();
          this.loadingScreenService.showLoadingScreen('Creando Equipo...');
          const newTeam: NewTeamRequest = {
            name: teamName,
            description: teamDescription,
          };

          const creatorId = this.authService.getLoggedInUser();

          const playerId = selectedPlayer.id;

          this.teamService.createTeam(creatorId, newTeam, playerId).subscribe({
            next: (team) => {
              setTimeout(() => {
                this.loadingScreenService.showLoadingScreen(null);

                this.confirmationModalService.openModal({
                  icon: ModalIconEnum.ok,
                  title: 'Equipo creado con éxito',
                  message: `Se ha creado el equipo ${team.name} correctamente.`,
                  accept: {
                    title: 'Aceptar',
                    action: () => {
                      this.confirmationModalService.closeModal();
                    },
                  },
                });
              }, 800);
            },
            error: (err) => {
              this.loadingScreenService.showLoadingScreen(null);
              console.error('Error creando el equipo', err);
            },
          });
        },
      },
      reject: {
        title: 'Cancelar',
        action: () => {
          this.confirmationModalService.closeModal();
        },
      },
    });
  }
  selectedMatch:CreatedMatch|null=null
  mockSelectedMatch:CreatedMatch= {
  id: 1,
  ownTeam: {
    name: "Los Invencibles",
    partner: "Juan Pérez"
  },
  rivalTeam: {
    name: "Los Retadores",
    players: ["Carlos Gómez", "Luis Fernández"]
  },
  preferences: {
    wallMaterial: new WallMaterial({ id: 1, name: "Vidrio" }),
    floorMaterial: new FloorMaterial({ id: 2, name: "Césped sintético" }),
    roofed: 1
  },
  timeSlot: [
    new TimeSlots({
      id: 101,
      index: 0,
      date: "01/09/2025",
      startTime: "8:00",
      endTime: "11:00"
    }),
    new TimeSlots({
      id: 102,
      index: 0,
      date: "02/09/2025",
      startTime: "9:00",
      endTime: "12:00"
    }),
    new TimeSlots({
      id: 103,
      index: 0,
      date: "02/09/2025",
      startTime: "14:00",
      endTime: "18:00"
    }),
  ]
}

  selectMatch(){
    this.selectedMatch=this.mockSelectedMatch
  }
  closePendingModal(){
    this.selectedMatch=null
  }
}
