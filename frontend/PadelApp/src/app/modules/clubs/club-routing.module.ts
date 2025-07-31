import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HabilitateClubComponent } from "./habilitate-club/habilitate-club.component";
import { ViewCourtsComponent } from "./view-courts/view-courts.component";

const routes: Routes = [
  {
    path: 'edit-profile',
    component: HabilitateClubComponent,
  },
  {
    path:"view-courts",
    component:ViewCourtsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }