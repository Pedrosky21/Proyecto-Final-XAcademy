import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HabilitateClubComponent } from "./habilitate-club/habilitate-club.component";

const routes: Routes = [
  {
    path: 'edit-profile',
    component: HabilitateClubComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }