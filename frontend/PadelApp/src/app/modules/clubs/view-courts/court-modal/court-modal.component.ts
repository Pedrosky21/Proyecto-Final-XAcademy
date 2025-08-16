import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Court } from '../../../../model/Court';
import { ClubService } from '../../../../core/services/ClubService';
import { Turn } from '../../../../model/Turn';
import { TableTurn } from '../../../../components/turn-table/types/TableTurn';
import { ConfirmationModalService } from '../../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../../core/layouts/loading-screen/service/loadingService';
import { ModalIconEnum } from '../../../../core/layouts/confirmation-modal/models/ModalProps';

@Component({
  selector: 'app-court-modal',
  templateUrl: './court-modal.component.html',
  styleUrl: './court-modal.component.scss',
})
export class CourtModalComponent implements OnChanges {
  @Output() onCloseModal = new EventEmitter();
  @Input() court: Court | null | undefined = null;
  @Input() columns: string[] = [];

  constructor(
    private readonly clubService: ClubService,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService
  ) {}
  turns: Turn[] | null = null;
  tableTurns: TableTurn[] = [];

  firstSunday: string = '';
  currentSunday: string = '';
  currentSaturday: string = '';

  onClose() {
    this.onCloseModal.emit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentSunday === '') {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - dayOfWeek);
      this.currentSunday =
        sunday.getDate() +
        '/' +
        (sunday.getMonth() + 1) +
        '/' +
        sunday.getFullYear();
      this.firstSunday = this.currentSunday;
      sunday.setDate(sunday.getDate() + 6);
      this.currentSaturday =
        sunday.getDate() +
        '/' +
        (sunday.getMonth() + 1) +
        '/' +
        sunday.getFullYear();
    }
    if (this.court) {
      this.loadTurns();
    }
  }
  loadTurns() {
    this.clubService
      .getCourtTurnsByWeek(Number(this.court?.id), this.currentSunday)
      .subscribe({
        next: (data: any) => {
          this.turns = data.map((turn: any) => new Turn(turn));
          if (this.turns) {
            this.setTurns(this.turns);
          }
        },
        error: (err) => {
          console.error('Error al cargar turnos', err);
        },
      });
  }

  setTurns(turns: Turn[]) {
    const [day, month, year] = this.currentSunday.split('/').map(Number);
    const seenDate = new Set<string>();
    const baseDate = new Date(year, month - 1, day);
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      const label =
        date.getDate().toString().padStart(2, '0') +
        '/' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        date.getFullYear();
      seenDate.add(label);
    }

    this.tableTurns = Array.from(seenDate).map((label) => {
      return {
        label: label,
        startHours: turns
          .filter((turn) => turn.date === label)
          .map((turn) => {
            return {
              hour: turn.startHour,
              idState: turn.stateId,
            };
          }),
      };
    });
  }

  changeWeek(next: boolean) {
    // Parsear currentSunday (formato DD/MM/YYYY)
    const [day, month, year] = this.currentSunday.split('/').map(Number);
    const sundayDate = new Date(year, month - 1, day);
    if (next) {
      // Sumar 7 días para el próximo domingo
      sundayDate.setDate(sundayDate.getDate() + 7);
      this.currentSunday =
        sundayDate.getDate().toString().padStart(2, '0') +
        '/' +
        (sundayDate.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        sundayDate.getFullYear();

      // Sumar 6 días más para el próximo sábado
      const saturdayDate = new Date(sundayDate);
      saturdayDate.setDate(sundayDate.getDate() + 6);
      this.currentSaturday =
        saturdayDate.getDate().toString().padStart(2, '0') +
        '/' +
        (saturdayDate.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        saturdayDate.getFullYear();
    } else {
      // Sumar 7 días para el próximo domingo
      sundayDate.setDate(sundayDate.getDate() - 7);
      this.currentSunday =
        sundayDate.getDate().toString().padStart(2, '0') +
        '/' +
        (sundayDate.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        sundayDate.getFullYear();

      // Sumar 6 días más para el próximo sábado
      const saturdayDate = new Date(sundayDate);
      saturdayDate.setDate(sundayDate.getDate() + 6);
      this.currentSaturday =
        saturdayDate.getDate().toString().padStart(2, '0') +
        '/' +
        (saturdayDate.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        saturdayDate.getFullYear();
    }
    this.loadTurns();
  }
  selectedTurn: Turn | undefined = undefined;
  clickRow(event: { weekDay: number; column: string }) {
    const columnIndex = this.columns.findIndex((col) => col === event.column);
    const existingHours = new Set(
      this.tableTurns[event.weekDay].startHours.map((e) => e.hour)
    );

    const colHour = this.columns[columnIndex];
    const prevHour1 = this.columns[columnIndex - 1];
    const prevHour2 = this.columns[columnIndex - 2];

    let clickTurn: any;
    if (existingHours.has(colHour)) {
      clickTurn = this.turns!.find(
        (col) =>
          col.date === this.tableTurns[event.weekDay].label &&
          col.startHour === colHour
      );
    }
    if (existingHours.has(prevHour1)) {
      clickTurn = this.turns!.find(
        (col) =>
          col.date === this.tableTurns[event.weekDay].label &&
          col.startHour === prevHour1
      );
    }
    if (existingHours.has(prevHour2)) {
      clickTurn = this.turns!.find(
        (col) =>
          col.date === this.tableTurns[event.weekDay].label &&
          col.startHour === prevHour2
      );
    }
    if (clickTurn?.playerName) {
      this.playerName = clickTurn.playerName;
    }
    this.selectedTurn = clickTurn;
  }
  closeChangeModal() {
    this.selectedTurn = undefined;
  }

  playerName: string = '';
  markAsReserved() {
    if (!this.playerName) {
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.error,
        title: 'Error',
        message: 'Debe ingresar el nombre de la persona que pidio el turno',
        accept: {
          title: 'Aceptar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
      });
    } else {
      this.confirmationModalService.openModal({
        title: 'Marcar turno como reservado',
        message: `¿Desea confirmar la reserva del turno a nombre de ${this.playerName}?`,
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
            this.loadingScreenService.showLoadingScreen(
              'Registrando reserva...'
            );
            this.clubService
              .markTurnAsReserved(this.selectedTurn?.id!, this.playerName)
              .subscribe({
                next: (response) => {
                  setTimeout(() => {
                    this.loadingScreenService.showLoadingScreen(null);
                    this.confirmationModalService.openModal({
                      icon: ModalIconEnum.ok,
                      title: 'Reserva registrada',
                      message:
                        'Se ha actualizado el estado del turno con éxito',
                      accept: {
                        title: 'Aceptar',
                        action: () => {
                          this.confirmationModalService.closeModal();
                          this.selectedTurn=undefined
                          this.loadTurns()
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
                      'Ocurrio un problema registrar la reserva. Intente de nuevo mas tarde',
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
  markAsPaid() {
    if (!this.playerName) {
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.error,
        title: 'Error',
        message: 'Debe ingresar el nombre de la persona que pago el turno',
        accept: {
          title: 'Aceptar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
      });
    } else {
      this.confirmationModalService.openModal({
        title: 'Marcar turno como pagado',
        message: `¿Desea marcar el turno reservado por ${this.playerName} como pagado?`,
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
            this.loadingScreenService.showLoadingScreen(
              'Registrando cambios...'
            );
            this.clubService
              .markTurnAsPaid(this.selectedTurn?.id!, this.playerName)
              .subscribe({
                next: (response) => {
                  setTimeout(() => {
                    this.loadingScreenService.showLoadingScreen(null);
                    this.confirmationModalService.openModal({
                      icon: ModalIconEnum.ok,
                      title: 'Cobro registrado',
                      message:
                        'Se ha actualizado el estado del turno con éxito',
                      accept: {
                        title: 'Aceptar',
                        action: () => {
                          this.confirmationModalService.closeModal();
                          this.selectedTurn=undefined
                          this.loadTurns()
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
                      'Ocurrio un problema al registrar el cobro. Intente de nuevo mas tarde',
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
  cancelReservation() {
    this.confirmationModalService.openModal({
      title: 'Cancelar la reserva del turno',
      message: `¿Desea cancelar la reserva hecha por ${this.playerName}?`,
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
          this.loadingScreenService.showLoadingScreen('Cancelando reserva...');
          this.clubService.cancelReservation(this.selectedTurn?.id!).subscribe({
            next: (response) => {
              setTimeout(() => {
                this.loadingScreenService.showLoadingScreen(null);
                this.confirmationModalService.openModal({
                  icon: ModalIconEnum.ok,
                  title: 'Reservación cancelada',
                  message: 'Se ha actualizado el estado del turno con éxito',
                  accept: {
                    title: 'Aceptar',
                    action: () => {
                      this.confirmationModalService.closeModal();
                          this.selectedTurn=undefined
                      this.loadTurns()
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
                  'Ocurrio un problema al cancelar la reserva. Intente de nuevo mas tarde',
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
  cancelPayment() {
    this.confirmationModalService.openModal({
      title: 'Anular pago de turno',
      message: `¿Desea cancelar el pago hecho por ${this.playerName}?`,
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
          this.loadingScreenService.showLoadingScreen('Cancelando pago...');
          this.clubService.cancelPayment(this.selectedTurn?.id!).subscribe({
            next: (response) => {
              setTimeout(() => {
                this.loadingScreenService.showLoadingScreen(null);
                this.confirmationModalService.openModal({
                  icon: ModalIconEnum.ok,
                  title: 'Pago cancelado',
                  message: 'Se ha actualizado el estado del turno con éxito',
                  accept: {
                    title: 'Aceptar',
                    action: () => {
                      this.confirmationModalService.closeModal();
                          this.selectedTurn=undefined
                      this.loadTurns()
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
                  'Ocurrio un problema al cancelar el pago. Intente de nuevo mas tarde',
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
