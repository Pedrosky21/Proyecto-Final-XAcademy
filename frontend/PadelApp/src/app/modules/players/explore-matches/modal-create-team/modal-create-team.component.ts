import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlayerService } from '../../../../core/services/PlayerServices';
import { AuthService } from '../../../../core/services/AuthService';

@Component({
  selector: 'app-modal-create-team',

  templateUrl: './modal-create-team.component.html',
  styleUrl: './modal-create-team.component.scss',
})
export class ModalCreateTeamComponent {
  constructor(
    private playerService: PlayerService,
    private authService: AuthService
  ) {}
  @Input() showCreateTeamModal = false;
  @Input() createTeamForm!: FormGroup;
  @Input() players: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  searchTerm = '';
  filteredPlayers: any[] = [];

  onSearchPlayer(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;

    if (value.trim().length < 2) {
      this.filteredPlayers = [];
      return;
    }

    const loggedUser = this.authService.getLoggedInUser();
    const loggedUserId = loggedUser?.id;

    this.playerService.searchPlayersByName(value).subscribe({
      next: (players) => {
        this.filteredPlayers = players

          .filter((p: any) => p.userId !== loggedUserId)
          .map((p: any) => ({
            ...p,
            fullName: `${p.firstName} ${p.lastName}`,
            age: this.calculateAge(p.birthDate),
          }));
      },
      error: (err) => {
        console.error('Error fetching players', err);
        this.filteredPlayers = [];
      },
    });
  }
  get selectedPlayer() {
    return this.createTeamForm.get('selectedPlayer')?.value;
  }

  selectPlayer(player: any) {
    this.createTeamForm.patchValue({ selectedPlayer: player });
    this.searchTerm = player.fullName;
    this.filteredPlayers = [];
  }

  private calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.confirm.emit();
  }
}
