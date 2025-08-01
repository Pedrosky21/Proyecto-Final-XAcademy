import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HabilitateClubComponent } from "./habilitate-club/habilitate-club.component";
import { ComponentsModule } from "../../components/components.module";
import { ViewCourtsComponent } from "./view-courts/view-courts.component";

@NgModule({
  declarations: [
    HabilitateClubComponent,
    ViewCourtsComponent
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