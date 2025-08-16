import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MenuItem } from '../../../model/menu-items';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PlayerService } from '../../services/PlayerServices';

type UserType = 'Jugador' | 'Club' | 'Admin' | 'Otro';

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

  // 1) Define menus per role
  private readonly MENU_JUGADOR: MenuItem[] = [
    { text: 'Inicio', route: '/home' },
    { text: 'Mis Partidos', route: '/players/explore-matches' },
    { text: 'Buscar Partidos', route: '/players/browse-matches' },
  ];

  private readonly MENU_CLUB: MenuItem[] = [
    { text: 'Inicio', route: '/home' },
    { text: 'Mis canchas', route: '/clubs/view-courts' },
  ];

  private readonly MENU_GUEST: MenuItem[] = [
    { text: 'Inicio', route: '/home' },
  ];

  menuItems: MenuItem[] = this.MENU_GUEST;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;

    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    const userType: UserType | null = user?.userType ?? null;
    this.setMenuFor(userType, this.isAuthenticated);

    if (this.isAuthenticated && user) {
      if (userType === 'Jugador') {
        this.playerService.getPlayers().subscribe({
          next: (players) => {
            const player = players.find((p: any) => p.userId === user.id);
            if (player) {
              this.userName = `${player.firstName} ${player.lastName}`;
              this.userImg = player.pictureUrl || '';
            } else {
              console.warn('Player not found for this user.');
              this.userEmail = user.email;
            }
          },
          error: (err) => console.error('Error fetching players:', err),
        });
      } else {
        this.userEmail = user.email;
      }
    }
  }

  // 2) Centralize menu switching
  private setMenuFor(userType: UserType | null, isAuth: boolean) {
    if (!isAuth || !userType) {
      this.menuItems = this.MENU_GUEST;
      return;
    }
    this.menuItems =
      userType === 'Jugador' ? this.MENU_JUGADOR : this.MENU_CLUB;
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
    this.userName = '';
    this.userImg = '';
    this.setMenuFor(null, false); // 3) reset to guest menu on logout
    this.router.navigate(['/login']);
  }

  login() {
    this.dropdownOpen = false;
    this.router.navigate(['login']);
  }
}
