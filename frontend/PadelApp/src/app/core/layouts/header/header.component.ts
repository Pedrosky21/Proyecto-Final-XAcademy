import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MenuItem } from '../../../model/menu-items';

import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PlayerService } from '../../services/PlayerServices';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  dropdownOpen = false;
  isAuthenticated = true;
  userEmail = '';
  userName = '';
  userImg = '';
  menuItems: MenuItem[] = [
    {
      text: 'Inicio',
      route: '/home',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current mr-2 inline"><path d="M256 48L48 256h64v160h96V320h64v96h96V256h64L256 48z"/></svg>`,
    },
    {
      text: 'Mis Partidos',
      route: 'players/explore-matches',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current mr-2 inline"><path d="M416 288c-50.1 0-93.6 28.8-114.6 70.8L68.9 126.3l.6-.6 60.1-60.1c87.5-87.5 229.3-87.5 316.8 0c67.1 67.1 82.7 166.3 46.8 248.3C471.8 297.6 445 288 416 288zM49.3 151.9L290.1 392.7c-1.4 7.5-2.1 15.3-2.1 23.3c0 23.2 6.2 44.9 16.9 63.7c-3 .2-6.1 .3-9.2 .3l-2.7 0c-33.9 0-66.5-13.5-90.5-37.5l-9.8-9.8c-13.1-13.1-34.6-12.4-46.8 1.7L88.2 501c-5.8 6.7-14.2 10.7-23 11s-17.5-3.1-23.8-9.4l-32-32C3.1 464.3-.3 455.7 0 446.9s4.3-17.2 11-23l66.6-57.7c14-12.2 14.8-33.7 1.7-46.8l-9.8-9.8C45.5 285.5 32 252.9 32 219l0-2.7c0-22.8 6.1-44.9 17.3-64.3zM416 320a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>`,
    },

    {
      text: 'Mis Equipos',
      route: 'players/equipos',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current mr-2 inline"><path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"/></svg>`,
    },
    {
      text: 'Buscar Partidos',
      route: 'players/browse-matches',
      icon: `<i class="fa-solid fa-phone-volume w-4 h-4 mr-2"></i>`,
    },
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      this.isAuthenticated = !!token;

      if (this.isAuthenticated) {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);

          if (user.userType === 'Jugador') {
            this.playerService.getPlayers().subscribe({
              next: (players) => {
                const player = players.find((p: any) => p.userId === user.id);
                if (player) {
                  this.userName = `${player.firstName} ${player.lastName}`;
                  this.userImg = `${player.pictureUrl}`;
                } else {
                  console.warn('Player not found for this user.');
                }
              },
              error: (err) => {
                console.error('Error fetching players:', err);
              },
            });
          } else if (user.userType === 'Club') {
            this.userEmail = user.email;
          } else {
            this.userEmail = user.email;
          }
        }
      }
    }
  }

  sanitizeIcon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  register() {
    this.router.navigate(['register']);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.isAuthenticated = false;
    this.userEmail = '';
    this.router.navigate(['/login']);
  }

  login() {
    this.dropdownOpen = false;
    this.router.navigate(['login']);
  }
}
