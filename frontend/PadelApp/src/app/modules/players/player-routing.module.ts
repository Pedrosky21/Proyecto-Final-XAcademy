import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ExploreMatchesComponent } from './explore-matches/explore-matches.component';

const routes: Routes = [
  {
    path: 'edit-profile',
    component: EditProfileComponent,
  },
  {
    path: 'explore-matches',
    component: ExploreMatchesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}
