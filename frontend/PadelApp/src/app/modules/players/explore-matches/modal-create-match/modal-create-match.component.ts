import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-create-match',

  templateUrl: './modal-create-match.component.html',
  styleUrl: './modal-create-match.component.scss',
})
export class ModalCreateMatchComponent {
  @Input() showCreateMatchModal = false;
  @Input() matchGroup!: FormGroup;
  @Input() clubs: string[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
