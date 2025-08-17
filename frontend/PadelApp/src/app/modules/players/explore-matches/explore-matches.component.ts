import { Component } from '@angular/core';
import { ModalIconEnum } from '../../../core/layouts/confirmation-modal/models/ModalProps';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../../../core/services/PlayerServices';

import { ConfirmationModalService } from '../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../core/layouts/loading-screen/service/loadingService';
import { TeamService } from '../../../core/services/TeamService';
import { NewTeamRequest } from '../../../model/NewTeamRequest';
import { AuthService } from '../../../core/services/AuthService';
import { Subject, takeUntil } from 'rxjs';

import { WallMaterial } from '../../../model/WallMaterial';
import { FloorMaterial } from '../../../model/FloorMaterial';
import { TimeSlots } from '../../../model/TimeSlots';
import { Match } from '../../../model/Match';
import { MatchService } from '../../../core/services/MatchService';
import { CreatedMatch } from '../../../model/CreatedMatch';

@Component({
  selector: 'app-explore-matches',

  templateUrl: './explore-matches.component.html',
  styleUrl: './explore-matches.component.scss',
})
export class ExploreMatchesComponent {
  constructor(
    private playerService: PlayerService,
    private readonly fb: FormBuilder,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService,
    private readonly teamService: TeamService,
    private readonly authService: AuthService,
    private readonly matchService: MatchService
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

  matchGroup: FormGroup;
  createTeamForm!: FormGroup;
  selectedMatch: CreatedMatch | null = null;
  selectedCreatedMatch: CreatedMatch | null = null;
  selectedConfirmedMatch: CreatedMatch | null = null;
  showCreateTeamModal = false;
  showCreateMatchModal = false;
  searchTerm = '';
  createdMatches: CreatedMatch[] = [];
  pendingMatches: CreatedMatch[] = [];
  confirmedMatches: CreatedMatch[] = [];
  players: any[] = [];
  teams: any[] = [];

  ngOnInit() {
    console.log('Token before API call:', this.authService.getToken());
    this.loadMyMatches();
  }
  loadUserTeams() {
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

  loadMyMatches(): void {
    this.playerService
      .getMyMatchesGrouped()

      .subscribe({
        next: (groups) => {
          this.createdMatches = groups.created
            ? groups.created.map((Match: any) => new CreatedMatch(Match))
            : [];
          this.pendingMatches = groups.pending
            ? groups.pending.map((Match: any) => new CreatedMatch(Match))
            : [];
          this.confirmedMatches = groups.confirmed
            ? groups.confirmed.map((Match: any) => new CreatedMatch(Match))
            : [];
        },

        error: (e) => {
          console.error('Error Loading matches', e);
        },
      });
  }

  getFirstTimeSlotText(match: Match | any): string {
    const ts = match?.timeSlots?.[0];
    if (!ts) return '—';
    // if times are stored like "22:00:00", show only hour:minutes
    const formatTime = (t: string) => {
      if (!t) return '';
      // keep HH:mm if "HH:mm:ss" or "HH:mm"
      const parts = t.split(':');
      if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;
      return t;
    };

    const date = ts.date ?? '—';
    const start = formatTime(ts.startTime);
    const end = formatTime(ts.endTime);
    return `${date} ${start ? start + ' - ' + end : ''}`.trim();
  }

  trackById(index: number, item: any) {
    return item?.id ?? index;
  }

  openCreateMatchModal() {
    this.loadUserTeams();
    this.showCreateMatchModal = true;
  }

  closeCreateMatchModal() {
    this.showCreateMatchModal = false;
    this.loadMyMatches();
  }

  openCreateTeamModal() {
    this.createTeamForm.reset();
    this.showCreateTeamModal = true;
  }

  closeCreateTeamModal() {
    this.showCreateTeamModal = false;
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

  selectPendingMatch(match: CreatedMatch) {
    this.selectedMatch = match;
  }

  selectCreatedMatch(match: CreatedMatch) {
    this.selectedCreatedMatch = match;
  }

  selectConfirmedMatch(match: CreatedMatch) {
    this.selectedConfirmedMatch = match;
  }
  closePendingModal() {
    this.selectedMatch = null;
  }

  closeCreatedModal() {
    this.selectedCreatedMatch = null;
  }

  closeConfirmedModal() {
    this.selectedConfirmedMatch = null;
  }
}
