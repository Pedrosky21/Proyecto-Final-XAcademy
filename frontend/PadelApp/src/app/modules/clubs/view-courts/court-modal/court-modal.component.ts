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

@Component({
  selector: 'app-court-modal',
  templateUrl: './court-modal.component.html',
  styleUrl: './court-modal.component.scss',
})
export class CourtModalComponent implements OnChanges {
  @Output() onCloseModal = new EventEmitter();
  @Input() court: Court | null | undefined = null;
  @Input() columns: string[] = [];

  constructor(private readonly clubService: ClubService) {}
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
          console.log(this.tableTurns)
        },
        error: (err) => {
          console.error('Error al cargar turnos', err);
        },
      });
  }

  setTurns(turns: Turn[]) {
    const [day, month, year] = this.currentSunday.split('/').map(Number);
    const seenDate= new Set<string>()
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
          .map((turn) =>{
            return{
              hour:turn.startHour,
              idState:turn.stateId
            }
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
}
