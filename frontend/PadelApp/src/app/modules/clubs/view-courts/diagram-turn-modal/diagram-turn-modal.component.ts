import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-diagram-turn-modal',
  templateUrl: './diagram-turn-modal.component.html',
  styleUrl: './diagram-turn-modal.component.scss'
})
export class DiagramTurnModalComponent {
  @Input() isOpen:boolean=false
  @Output() onCloseModal= new EventEmitter()

  onClose(){
    this.onCloseModal.emit()
  }
}
