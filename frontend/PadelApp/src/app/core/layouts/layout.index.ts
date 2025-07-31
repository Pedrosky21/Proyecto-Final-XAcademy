import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { MatchModalComponent } from './match-modal/match-modal/match-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmationModalComponent,
    LoadingScreenComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    ConfirmationModalComponent,
    LoadingScreenComponent,
  ],
})
export class LayoutModule {}
