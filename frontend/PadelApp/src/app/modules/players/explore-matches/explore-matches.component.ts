import { Component } from '@angular/core';
import { ModalIconEnum } from '../../../core/layouts/confirmation-modal/models/ModalProps';

import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { PlayerService } from '../../../core/services/PlayerServices';

import { ConfirmationModalService } from '../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../core/layouts/loading-screen/service/loadingService';

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
    private loadingScreenService: loadingScreenService
  ) {
    this.matchGroup = this.fb.group({
      selectedTeam: ['', Validators.required],
      floorMaterial: ['', Validators.required],
      wallMaterial: ['', Validators.required],
      roofed: ['', Validators.required],
    });

    this.createTeamForm = this.fb.group({
      selectedPlayer: [null, Validators.required],
      teamName: ['', [Validators.required, Validators.minLength(3)]],
      teamDescription: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  matchGroup: FormGroup;
  createTeamForm!: FormGroup;

  showCreateTeamModal = false;
  showCreateMatchModal = false;

  players: any[] = [];
  clubs: string[] = ['Los Imbatibles', 'Los Campeones'];

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        this.players = data.map((p: any) => {
          return {
            ...p,
            fullName: `${p.firstName} ${p.lastName}`,
          };
        });
      },
      error: (err) => {
        console.error('Error fetching players', err);
      },
    });
  }

  loadTeams() {}

  get selectedPlayer() {
    return this.createTeamForm.value.selectedPlayer;
  }

  openCreateMatchModal() {
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
          // enviarse data al backend
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
      message: `¿Desea crear el equipo ${teamName} con ${this.selectedPlayer?.fullName}?`,
      icon: ModalIconEnum.ok,
      accept: {
        title: 'Confirmar',
        action: () => {
          this.confirmationModalService.closeModal();

          this.loadingScreenService.showLoadingScreen('Creando Equipo...');
          // data to send

          setTimeout(() => {
            this.loadingScreenService.showLoadingScreen(null);
          }, 2000);

          this.confirmationModalService.openModal({
            icon: ModalIconEnum.ok,
            title: 'Equipo creado con exito',
            message: 'Se ha creado el equipo Los Imbatibles correctamente.',
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
}
