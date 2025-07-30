import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { LoginPageComponent } from './modules/login/login-page/login-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'players',
    loadChildren: () => import('./modules/players/player-routing.module').then(m => m.PlayersRoutingModule),
  },
  {
    path: 'clubs',
    loadChildren: () => import('./modules/clubs/club-routing.module').then(m => m.ClubRoutingModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
