import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layouts/header/header.component';
import { CommonModule, NgIf } from '@angular/common';
import { LayoutModule } from './core/layouts/layout.index';
import { PlayersModule } from './modules/players/player.module';
import { MatchModalComponent } from './core/layouts/match-modal/match-modal/match-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutModule,
    CommonModule,
    RouterOutlet,
    PlayersModule,
    MatchModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PadelApp';
  constructor(public router: Router) {}

  get isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}
