import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HabilitateClubComponent } from "./habilitate-club/habilitate-club.component";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    HabilitateClubComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports:[
    HabilitateClubComponent
  ]
})
export class ClubModule { }