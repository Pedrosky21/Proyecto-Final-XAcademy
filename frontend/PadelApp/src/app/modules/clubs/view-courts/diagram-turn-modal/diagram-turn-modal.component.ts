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
  @Input() columns:string[]=[]

  onClose() {
    this.onCloseModal.emit();
  }

  constructor(
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService,
    private readonly clubService: ClubService
  ) {}
  courtsDiagram: DiagramatingTurnsCourt[] = [];
  selectedMonth: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['club'] && this.club?.openningTime) {
      this.setRows();
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
    const existingHours = new Set(days.startHours.map(e => e.hour));

    const colHour = this.columns[columnIndex];
    const prevHour1 = this.columns[columnIndex - 1];
    const prevHour2 = this.columns[columnIndex - 2];
    const nextHour1= this.columns[columnIndex + 1];
    const nextHour2=this.columns[columnIndex+2]

    let deleted = false;

    if(existingHours.has(colHour)){
      deleted=true
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours=
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours.filter((element)=>element.hour!==colHour)
    }
    if(existingHours.has(prevHour1)){
      deleted=true
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours=
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours.filter((element)=>element.hour!==prevHour1)
    }
    if(existingHours.has(prevHour2)){
      deleted=true
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours=
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours.filter((element)=>element.hour!==prevHour2)
    }
    if(existingHours.has(nextHour1)){
      deleted=true
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours=
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours.filter((element)=>element.hour!==nextHour1)
    }
    if(existingHours.has(nextHour2)){
      deleted=true
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours=
      this.courtsDiagram[this.selectedCourt].days[event.weekDay].startHours.filter((element)=>element.hour!==nextHour2)
    }
    
    // Si no se eliminó nada, es porque no pertenece a un turno → crear uno
    if (!deleted) {
      days.startHours.push({hour:event.column,idState:0});
    }
  }

  getHoverClass() {
    return 'bg-appPrimay';
  }

  applyAll() {
    //clonar los dias de la cancha seleccionada
    const selectedDays = this.courtsDiagram[this.selectedCourt].days.map(
      (day) => ({
        label: day.label,
        startHours: [...day.startHours], 
      })
    );

    //clonar esos dias a cada cancha
    this.courtsDiagram = this.courtsDiagram.map((diagram) => ({
      ...diagram,
      days: selectedDays.map((day) => ({
        label: day.label,
        startHours: [...day.startHours], 
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
