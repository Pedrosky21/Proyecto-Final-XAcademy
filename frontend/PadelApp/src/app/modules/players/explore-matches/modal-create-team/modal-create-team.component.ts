import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-create-team',

  templateUrl: './modal-create-team.component.html',
  styleUrl: './modal-create-team.component.scss',
})
export class ModalCreateTeamComponent {
  @Input() showCreateTeamModal = false;
  @Input() createTeamForm!: FormGroup;
  @Input() players: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  get selectedPlayer() {
    return this.createTeamForm?.value.selectedPlayer;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.confirm.emit();
  }
}
