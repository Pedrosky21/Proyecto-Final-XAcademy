import { Component } from '@angular/core';
import { ModalIconEnum } from '../../../core/layouts/confirmation-modal/models/ModalProps';

import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../../core/services/PlayerServices';

import { ConfirmationModalService } from '../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../core/layouts/loading-screen/service/loadingService';

@Component({
  selector: 'app-explore-matches',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './explore-matches.component.html',
  styleUrl: './explore-matches.component.scss',
})
export class ExploreMatchesComponent {
  constructor(
    private playerService: PlayerService,
    private confirmationModalService: ConfirmationModalService,
    private loadingScreenService: loadingScreenService
  ) {}

  showCreateTeamModal = false;
  showCreateMatchModal = false;
  teamName = '';
  teamDescription = '';
  selectedPlayer: any = null;
  players: any[] = [];
  clubs: string[] = ['Los Imbatibles', 'Los Campeones'];

  formData = {
    selectedTeam: '',
    floorMaterial: '',
    wallMaterial: '',
    roofed: '',
  };

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

  openCreateMatchModal() {
    this.showCreateMatchModal = true;
  }

  closeCreateMatchModal() {
    this.showCreateMatchModal = false;
  }

  openCreateTeamModal() {
    this.showCreateTeamModal = true;
  }

  closeCreateTeamModal(reset: boolean = true) {
    this.showCreateTeamModal = false;
    if (reset) {
      this.selectedPlayer = null;
    }
  }

  selectPlayer(player: any) {
    this.selectedPlayer = player;
  }

  onConfirmMatchModal() {
    const matchData = {
      selectedTeam: this.formData.selectedTeam,
      floorMaterial: this.formData.floorMaterial,
      wallMaterial: this.formData.wallMaterial,
      roofed: this.formData.roofed,
    };

    this.closeCreateMatchModal();
    setTimeout(() => {
      console.log(this.formData.selectedTeam);
      this.confirmationModalService.openModal({
        title: '¿Confirmar partido?',
        message: `¿Desea crear el partido con el equipo ${this.formData.selectedTeam}?`,
        icon: ModalIconEnum.ok,
        accept: {
          title: 'Confirmar',
          action: () => {
            this.confirmationModalService.closeModal();
            this.loadingScreenService.showLoadingScreen('Creando Partido...');
            // data to send

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
    }, 300);
  }

  onConfirmTeamModal() {
    const teamData = {
      name: this.teamName,
      description: this.teamDescription,
      playerId: this.selectedPlayer?.id,
    };

    this.closeCreateTeamModal(false);
    setTimeout(() => {
      this.confirmationModalService.openModal({
        title: '¿Confirmar equipo?',
        message: `¿Desea crear el equipo ${this.teamName} con ${this.selectedPlayer?.fullName}?`,
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
    }, 300);
  }
}
