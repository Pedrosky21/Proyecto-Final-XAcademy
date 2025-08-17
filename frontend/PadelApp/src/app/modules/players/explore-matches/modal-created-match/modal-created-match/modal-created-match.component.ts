import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ViewColumnSettings } from '../../../../../components/table/models/ViewColumnSettings';
import { TimeSlots } from '../../../../../model/TimeSlots';
import { CreatedMatch } from '../../../../../model/CreatedMatch';

@Component({
  selector: 'app-modal-created-match',

  templateUrl: './modal-created-match.component.html',
  styleUrl: './modal-created-match.component.scss',
})
export class ModalCreatedMatchComponent {
  @Input() match?: CreatedMatch | null = null;
  @Output() closeModal = new EventEmitter();

  rowsWithIndex: any[] = [];

  private formatTime(t: string | undefined): string {
    if (!t) return '';
    const parts = t.split(':');
    return `${parts[0]}:${parts[1]}`; // HH:mm
  }

  get timeSlotRows(): (TimeSlots & {
    index: number;
    startTime: string;
    endTime: string;
  })[] {
    const slots = this.match?.timeSlots ?? [];
    return slots.map((s, i) => ({
      ...s,
      index: i + 1,
      startTime: this.formatTime(s.startTime),
      endTime: this.formatTime(s.endTime),
    }));
  }
  columns: ViewColumnSettings<TimeSlots>[] = [
    {
      title: 'N°',
      key: 'index',
    },
    {
      title: 'Fecha',
      key: 'date',
    },
    {
      title: 'Hora inicio',
      key: 'startTime',
    },
    {
      title: 'Hora Fin',
      key: 'endTime',
    },
  ];

  onClose() {
    this.closeModal.emit();
  }
}
