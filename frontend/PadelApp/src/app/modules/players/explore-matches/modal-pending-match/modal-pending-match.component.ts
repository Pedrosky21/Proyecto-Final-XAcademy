import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CreatedMatch } from '../../../../model/CreatedMatch';
import { ViewColumnSettings } from '../../../../components/table/models/ViewColumnSettings';
import { TimeSlots } from '../../../../model/TimeSlots';
import { Club } from '../../../../model/Club';
import { MatchService } from '../../../../core/services/MatchService';
import { Turn } from '../../../../model/Turn';
import { TableTurn } from '../../../../components/turn-table/types/TableTurn';
import { ConfirmationModalService } from '../../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../../core/layouts/loading-screen/service/loadingService';
import { ModalIconEnum } from '../../../../core/layouts/confirmation-modal/models/ModalProps';
enum StepEnum{
    First="ViewData",
    Second="SelectClub",
    Third="SelectCourt",
    Fourth="SelectTurn"
  }
@Component({
  selector: 'app-modal-pending-match',
  templateUrl: './modal-pending-match.component.html',
  styleUrl: './modal-pending-match.component.scss'
})
export class ModalPendingMatchComponent implements OnChanges{
  @Input() match?:CreatedMatch|null=null
  @Output() closeModal= new EventEmitter()
  
  stepEnum=StepEnum
  step:StepEnum=StepEnum.First
  selectableClubs:Club[]=[]
  selectedClub:Club|null=null
  sundaysOfWeeks:string[]=[]
  turns:Turn[]=[]
  tableTurns: TableTurn[] | undefined = undefined;
  
  constructor(
    private readonly matchService:MatchService,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService
  ){

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['match'] && this.match?.timeSlot) {
      this.generateSundays();
    }
  }

  private generateSundays(): void {
    const sundaysSet = new Set<string>();

    for (const ts of this.match!.timeSlot!) {
    const [dayStr, monthStr, yearStr] = ts.date!.split("/");
    const date = new Date(+yearStr, +monthStr - 1, +dayStr)
      const day = date.getDay(); // 0 = domingo, 1 = lunes, etc.

      // domingo de esa semana (resta la cantidad de días desde el domingo)
      const sunday = new Date(date);
      sunday.setDate(date.getDate() - day);

      // Formato dd/mm/aaaa
      const formatted = sunday.getDate()+"/"+Number(sunday.getMonth()+1)+"/"+sunday.getFullYear()
      sundaysSet.add(formatted);
    }

    // Convertimos el set a array
    this.sundaysOfWeeks = Array.from(sundaysSet);
    console.log("Domingos de semanas:", this.sundaysOfWeeks);
  }

  onClose(){
    console.log("ajajaj")
    this.selectedClub=null
    this.selectableClubs=[]
    this.turns=[]
    this.tableTurns=[]
    this.sundaysOfWeeks=[]
    this.step= StepEnum.First
    this.closeModal.emit()
  }
  turnColumns:string[]=[]
  setColumns() {
    const initialTime = Number(this.selectedClub?.openningTime.split(':')[0]) * 60;
    let currentTime = initialTime;
    const finalTime = Number(this.selectedClub?.closingTime.split(':')[0]) * 60;

    while (currentTime < finalTime) {
      const hours = Math.floor(currentTime / 60)
        .toFixed()
        .padStart(2, '0');
      const minutes = (currentTime % 60).toFixed().padStart(2, '0');
      this.turnColumns.push(hours + ':' + minutes);

      currentTime += 30;
    }
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
  initiateSelection(){
    this.step=StepEnum.Second
    this.matchService.getClubsForMatch(2).subscribe({
      next:(data)=>{
        const clubs=data.map((club:any)=>new Club(club))
        this.selectableClubs=clubs
      },
      error:()=>{
        console.log()
      }
    })
  }

  stepBack(){
    switch (this.step) {
      case StepEnum.Second:
        this.selectableClubs=[]
        this.step=StepEnum.First
        break;
      case StepEnum.Third:
        this.selectedClub=null
        this.step=StepEnum.Second
        break;
      case StepEnum.Fourth:
        this.turns=[]
        this.tableTurns=[]
        this.step= StepEnum.Third
        break;
    }
    
  }
  selectClub(index:number){
    this.step=StepEnum.Third
    this.matchService.getCourtsForMatch(2,this.selectableClubs[index].id).subscribe({
      next:(data)=>{
        const club=new Club(data)
        this.selectedClub=club
        this.setColumns()
      },
      error:()=>{
        console.log()
      }
    })

  }

  selectCourt(courtIndex:number){
    this.step= StepEnum.Fourth
    const courtId:number= this.selectedClub?.courts![courtIndex].id!
    this.matchService.getTurnsForMatch(2,courtId, this.sundaysOfWeeks[0]).subscribe({
      next:(data)=>{
        console.log(data)
        const turns=(data as Array<any>).map((turn)=>new Turn(turn))
        this.turns= turns
        this.setTurns(turns)
        console.log(this.turns)
      },
      error:()=>{
        console.log()
      }
    })
  }
  setTurns(turns: Turn[]) {
    const [day, month, year] = this.sundaysOfWeeks[0].split('/').map(Number);
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
  clickRow(event: { weekDay: number; column: string }) {
    const columnIndex = this.turnColumns.findIndex((col) => col === event.column);
    const existingHours = new Set(
      this.tableTurns![event.weekDay].startHours.map((e) => e.hour)
    );

    const colHour = this.turnColumns[columnIndex];
    const prevHour1 = this.turnColumns[columnIndex - 1];
    const prevHour2 = this.turnColumns[columnIndex - 2];

    let clickTurn:any
    if (existingHours.has(colHour)) {
      clickTurn = this.turns!.find(
        (col) =>
          col.date === this.tableTurns![event.weekDay].label &&
          col.startHour === colHour
      );
    }
    if (existingHours.has(prevHour1)) {
      clickTurn = this.turns!.find(
        (col) =>
          col.date === this.tableTurns![event.weekDay].label &&
          col.startHour === prevHour1
      );
    }
    if (existingHours.has(prevHour2)) {
      clickTurn = this.turns!.find(
        (col) =>
          col.date === this.tableTurns![event.weekDay].label &&
          col.startHour === prevHour2
      );
    }
    
    this.confirmationModalService.openModal({
      title: 'Confirmar reserva',
      message:
        '¿Desea reservar el turno?',
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
          this.loadingScreenService.showLoadingScreen('Reservando...');
          // Create player
          this.matchService.reserveTurn(this.match?.id!,clickTurn.id).subscribe({
            next: () => {
              this.loadingScreenService.showLoadingScreen(null);
              this.confirmationModalService.openModal({
                icon: ModalIconEnum.ok,
                title: 'Reserva exitosa',
                message: 'Se ha marcado el turno como reservado',
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    this.confirmationModalService.closeModal();
                  },
                },
              });
            },
            error: () => {
              this.loadingScreenService.showLoadingScreen(null);
              this.confirmationModalService.openModal({
                icon: ModalIconEnum.error,
                title: 'Error al reservar',
                message:
                  'Ha ocurrido un error al reservar el turno, intente de nuevo más tarde.',
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
