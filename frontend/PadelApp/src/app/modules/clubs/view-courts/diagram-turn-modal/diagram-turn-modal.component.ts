import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Club } from '../../../../model/Club';
import { DiagramatingTurnsCourt } from '../../../../model/DiagramatedTurn';
import { ConfirmationModalService } from '../../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../../core/layouts/loading-screen/service/loadingService';
import { ClubService } from '../../../../core/services/ClubService';
import { ModalIconEnum } from '../../../../core/layouts/confirmation-modal/models/ModalProps';

@Component({
  selector: 'app-diagram-turn-modal',
  templateUrl: './diagram-turn-modal.component.html',
})
export class DiagramTurnModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Output() onCloseModal = new EventEmitter();
  @Output() onCellClick = new EventEmitter();
  @Input() club?: Club;

  onClose() {
    this.onCloseModal.emit();
  }

  constructor(
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService,
    private readonly clubService: ClubService
  ) {}
  columns: string[] = [];
  courtsDiagram: DiagramatingTurnsCourt[] = [];
  selectedMonth: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['club'] && this.club?.openningTime) {
      this.setColumns();
      this.setRows();
    }
  }
  setColumns() {
    const initialTime = Number(this.club?.openningTime.split(':')[0]) * 60;
    let currentTime = initialTime;
    const finalTime = Number(this.club?.closingTime.split(':')[0]) * 60;

    while (currentTime < finalTime) {
      const hours = Math.floor(currentTime / 60)
        .toFixed()
        .padStart(2, '0');
      const minutes = (currentTime % 60).toFixed().padStart(2, '0');
      this.columns.push(hours + ':' + minutes);

      currentTime += 30;
    }
  }
  setRows() {
    this.courtsDiagram = this.club?.courts!.map(
      (court) => new DiagramatingTurnsCourt(court, [0, 1, 2, 3, 4, 5, 6])
    )!;

  }
  selectedCourt = 0;
  setSelectedCourt(index: number) {
    this.selectedCourt = index;
  }

  clickRow(event: { weekDay: number; column: string }) {
    const columnIndex = this.columns.findIndex((col) => col === event.column);
    const days = this.courtsDiagram[this.selectedCourt].days[event.weekDay];
    const turns = days.turns;

    let deleted = false;

    // Buscar si esta celda pertenece a algún turno existente (que empieza en alguna de las 5 anteriores)
    for (let i = columnIndex - 2; i <= columnIndex; i++) {
      if (i < 0) continue;

      const potentialStart = this.columns[i];
      if (turns.includes(potentialStart)) {
        // Si la columna clickeada está dentro del rango de ese turno (start, start+1, start+2)
        const startIdx = this.columns.findIndex(
          (col) => col === potentialStart
        );
        if (columnIndex >= startIdx && columnIndex <= startIdx + 2) {
          // Eliminar ese turno
          days.turns = turns.filter((t) => t !== potentialStart);
          deleted = true;
          break;
        }
      }
    }

    // Si no se eliminó nada, es porque no pertenece a un turno → crear uno
    if (!deleted) {
      days.turns.push(event.column);
    }
  }

  getHoverClass() {
    return 'bg-appPrimay';
  }

  applyAll() {
    //clonar los dias de la cancha seleccionada
    const selectedDays = this.courtsDiagram[this.selectedCourt].days.map(
      (day) => ({
        weekDay: day.weekDay,
        turns: [...day.turns], 
      })
    );

    //clonar esos dias a cada cancha
    this.courtsDiagram = this.courtsDiagram.map((diagram) => ({
      ...diagram,
      days: selectedDays.map((day) => ({
        weekDay: day.weekDay,
        turns: [...day.turns], 
      })),
    }));
  }

  handleSubmit($event: Event) {
    if (!this.selectedMonth) {
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.error,
        title: 'Error al confirmar turnos',
        message: 'Debe seleccionar un mes antes de continuar',
        accept: {
          title: 'Aceptar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
      });
    } else {
      this.confirmationModalService.openModal({
        title: 'Confirmar diagramación',
        message: `¿Desea guardar la configuración ingresada?`,
        reject: {
          title: 'Cancelar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
        accept: {
          title: 'Confirmar',
          action: () => {
            this.confirmationModalService.closeModal();
            this.loadingScreenService.showLoadingScreen('Generando turnos...');
            this.clubService
              .diagramTurns(this.courtsDiagram, this.selectedMonth)
              .subscribe({
                next: (response) => {
                  setTimeout(() => {
                    this.loadingScreenService.showLoadingScreen(null);
                    this.confirmationModalService.openModal({
                      icon: ModalIconEnum.ok,
                      title: 'Turnos generados con éxito',
                      message: 'Ya puede consultarlos desde cada cancha',
                      accept: {
                        title: 'Aceptar',
                        action: () => {
                          this.confirmationModalService.closeModal();
                        },
                      },
                    });
                  }, 1500);
                },
                error: (error) => {
                  console.log(error)
                  this.loadingScreenService.showLoadingScreen(null);
                  this.confirmationModalService.openModal({
                    icon: ModalIconEnum.error,
                    title: 'Error',
                    message:
                      'Ocurrio un problema al generar los turnos. Intente de nuevo mas tarde',
                    accept: {
                      title: 'Aceptar',
                      action: () => {
                        this.confirmationModalService.closeModal();
                      },
                    },
                  });
                },
              });
          },
        },
      });
    }
  }
  getCourtButtonClass(court: number) {
    return court === this.selectedCourt
      ? 'bg-appPrimary text-appBlackText'
      : '';
  }
}
