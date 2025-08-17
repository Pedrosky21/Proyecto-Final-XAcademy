import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreMatchesComponent } from './explore-matches/explore-matches.component';
import { ModalCreateTeamComponent } from './explore-matches/modal-create-team/modal-create-team.component';
import { ModalCreateMatchComponent } from './explore-matches/modal-create-match/modal-create-match.component';
import { ComponentsModule } from '../../components/components.module';
import { BrowseMatchesComponent } from './browse-matches/browse-matches.component';
import { ModalAcceptMatchComponent } from './browse-matches/modal-accept-match/modal-accept-match/modal-accept-match.component';
import { ModalPendingMatchComponent } from './explore-matches/modal-pending-match/modal-pending-match.component';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { ModalCreatedMatchComponent } from './explore-matches/modal-created-match/modal-created-match/modal-created-match.component';
import { ModalConfirmedMatchComponent } from './explore-matches/modal-confirmed-match/modal-confirmed-match.component';

@NgModule({
  declarations: [
    EditProfileComponent,
    ExploreMatchesComponent,
    ModalCreateTeamComponent,
    ModalCreateMatchComponent,
    BrowseMatchesComponent,
    ModalAcceptMatchComponent,
    ModalPendingMatchComponent,
    ModalCreatedMatchComponent,
    ModalConfirmedMatchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
  ],
})
export class PlayersModule {}
