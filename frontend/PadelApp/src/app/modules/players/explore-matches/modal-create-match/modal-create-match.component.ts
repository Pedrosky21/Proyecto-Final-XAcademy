import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditTableColumn } from '../../../../components/edit-table/models/ColumntSetting';
import { TimeSlots } from '../../../../model/TimeSlots';
import { Time } from '@angular/common';
import { ConfirmationModalService } from '../../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { ModalIconEnum } from '../../../../core/layouts/confirmation-modal/models/ModalProps';

import { loadingScreenService } from '../../../../core/layouts/loading-screen/service/loadingService';
@Component({
  selector: 'app-modal-create-match',

  templateUrl: './modal-create-match.component.html',
  styleUrl: './modal-create-match.component.scss',
})
export class ModalCreateMatchComponent {
  @Input() showCreateMatchModal = false;
  @Input() matchGroup!: FormGroup;
  @Input() clubs: string[] = [];
  newTimeSlots: TimeSlots[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  columnsSettings: EditTableColumn<TimeSlots>[] = [];

  constructor(
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService
  ) {}

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

  addTimeSlot() {
    this.newTimeSlots.push(
      new TimeSlots({
        index:
          this.newTimeSlots.length !== 0
            ? this.newTimeSlots[this.newTimeSlots.length - 1].index + 1
            : 1,
        date: '',
        startTime: '',
        finishTime: '',
      })
    );
    console.log(this.newTimeSlots);
  }

  handleRowChange(event: { index: number; key: keyof TimeSlots; value: any }) {
    (this.newTimeSlots[event.index] as any)[event.key] = event.value;
  }

  deleteRow(event: { index: number }) {
    this.newTimeSlots = this.newTimeSlots.filter((_, i) => i !== event.index);

    this.newTimeSlots = this.newTimeSlots.map((row, i) => ({
      ...row,
      index: i + 1,
    }));
  }

  validateTable(): string {
    const hasInvalidDuration = this.newTimeSlots.some((timeslot) => {
      const [startHour, startMinute] = timeslot.startTime
        .split(':')
        .map(Number);
      const [finishHour, finishMinute] = timeslot.finishTime
        .split(':')
        .map(Number);

      const startTotalMinutes = startHour * 60 + startMinute;
      const finishTotalMinutes = finishHour * 60 + finishMinute;

      const diffMinutes = finishTotalMinutes - startTotalMinutes;

      return diffMinutes < 90;
    });

    if (hasInvalidDuration) {
      return 'Cada partido debe durar al menos 1 hora y 30 minutos';
    }
    if (!this.newTimeSlots || this.newTimeSlots.length === 0) {
      return 'Debe agregar al menos un horario';
    }

    const hasIncompleteTimeSlots = this.newTimeSlots.some((timeslot) =>
      Object.entries(timeslot).some(
        ([key, value]) =>
          key !== 'id' &&
          (value === null || value === undefined || value === '')
      )
    );

    if (hasIncompleteTimeSlots) {
      return 'Debe completar los horarios y fechas de todos los partidos';
    }

    return '';
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const tableMessage = this.validateTable();
    if (this.matchGroup.invalid || tableMessage) {
      this.close.emit();
      const message: string = this.matchGroup.invalid
        ? 'Revise los valores ingresados antes de continuar'
        : tableMessage;
      this.matchGroup.markAllAsTouched();
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.error,
        title: 'Error en el formulario',
        message,
        accept: {
          title: 'Aceptar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
      });
    } else {
      this.close.emit();
      this.confirmationModalService.openModal({
        title: '¿Confirmar partido?',
        message: `¿Desea crear el partido con los horarios seleccionados?`,
        reject: {
          title: 'Cancelar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
        accept: {
          title: 'Aceptar',
          action: () => {
            this.confirmationModalService.closeModal();
            this.loadingScreenService.showLoadingScreen('Creando Partido...');
            const newMatch = {
              ...this.matchGroup.value,
              timeSlots: this.newTimeSlots,
            };
            console.log(newMatch);
            /*
this.clubService.habilitateClub(formValue).subscribe({
  next: (response) => {
    setTimeout(() => {
      this.loadingScreenService.showLoadingScreen(null);
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.ok,
        title: 'Club configurado con éxito',
        message: 'Se ha guardado la nueva información con éxito',
        accept: {
          title: 'Aceptar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
      });
    }, 1500);
  },
});
*/
            // esto deberia ir en el medio

            setTimeout(() => {
              this.loadingScreenService.showLoadingScreen(null);
            }, 2000);

            this.confirmationModalService.openModal({
              icon: ModalIconEnum.ok,
              title: 'Partido creado con éxito',
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
      });
    }
  }
  setColumns() {
    this.columnsSettings = [
      {
        key: 'index',
        title: 'N°',
        editable: false,
      },
      {
        key: 'date',
        title: 'Fecha',
        editable: true,
        type: 'date',
      },
      {
        key: 'startTime',
        title: 'Hora Inicio',
        editable: true,
        type: 'time',
      },
      {
        key: 'finishTime',
        title: 'Hora Fin',
        editable: true,
        type: 'time',
      },
    ];
  }
  ngOnInit(): void {
    this.setColumns();
  }
}
