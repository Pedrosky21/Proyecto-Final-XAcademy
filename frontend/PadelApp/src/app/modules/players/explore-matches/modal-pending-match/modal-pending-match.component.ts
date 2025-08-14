import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Match } from '../../../../model/Match';
import { CreatedMatch } from '../../../../model/CreatedMatch';
import { ViewColumnSettings } from '../../../../components/table/models/ViewColumnSettings';
import { TimeSlots } from '../../../../model/TimeSlots';

@Component({
  selector: 'app-modal-pending-match',
  templateUrl: './modal-pending-match.component.html',
  styleUrl: './modal-pending-match.component.scss'
})
export class ModalPendingMatchComponent {
  @Input() match?:CreatedMatch|null=null
  @Output() closeModal= new EventEmitter()
  

  onClose(){
    this.closeModal.emit()
  }

  columns:ViewColumnSettings<TimeSlots>[]=[{
      title:"N°",
      key:"index"
  },{
      title:"Fecha",
      key:"date"
  },{
      title:"Hora inicio",
      key:"startTime"
  },{
      title:"Hora Fin",
      key:"endTime"
  },
]
}
