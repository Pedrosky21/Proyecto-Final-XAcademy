import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HabilitateClubComponent } from "./habilitate-club/habilitate-club.component";
import { ComponentsModule } from "../../components/components.module";
import { ViewCourtsComponent } from "./view-courts/view-courts.component";
import { DiagramTurnModalComponent } from "./view-courts/diagram-turn-modal/diagram-turn-modal.component";
import { CourtModalComponent } from "./view-courts/court-modal/court-modal.component";

@NgModule({
  declarations: [
    HabilitateClubComponent,
    ViewCourtsComponent,
    DiagramTurnModalComponent,
    CourtModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports:[
    HabilitateClubComponent,
    ViewCourtsComponent
  ]
})
export class ClubModule { }