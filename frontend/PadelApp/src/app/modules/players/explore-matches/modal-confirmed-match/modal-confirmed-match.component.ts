import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreatedMatch } from '../../../../model/CreatedMatch';

@Component({
  selector: 'app-modal-confirmed-match',

  templateUrl: './modal-confirmed-match.component.html',
  styleUrl: './modal-confirmed-match.component.scss',
})
export class ModalConfirmedMatchComponent {
  @Input() match?: CreatedMatch | null = null;
  @Output() closeModal = new EventEmitter();

  onClose() {
    this.closeModal.emit();
  }
}
