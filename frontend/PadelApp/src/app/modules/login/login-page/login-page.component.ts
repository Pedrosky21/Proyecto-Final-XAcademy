import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/AuthService';
import { Router, RouterModule } from '@angular/router';
import { loadingScreenService } from '../../../core/layouts/loading-screen/service/loadingService';
import { ModalIconEnum } from '../../../core/layouts/confirmation-modal/models/ModalProps';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationModalService } from '../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  subscription = new Subscription();
  userForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  handleLogin() {
    if (!this.userForm.invalid) {
      this.loadingScreenService.showLoadingScreen('Iniciando sesión...');

      this.subscription.add(
        this.authService.login(this.userForm.value).subscribe({
          next: (res) => {
            setTimeout(() => {
              const { token, user } = res;
              localStorage.setItem('token', token);
              this.loadingScreenService.showLoadingScreen(null);
              switch (user.userType) {
                case 'Pendiente':
                  this.router.navigate(['/select-role']);
                  break;
                case 'Jugador':
                  this.router.navigate(['/players/browse-matches']);
                  break;
                case 'Club':
                  this.router.navigate(['/clubs/view-courts']);
                  break;
                default:
                  this.router.navigate(['/home']);
              }
            }, 1500);
          },
          error: (error) => {
            console.error('Error al iniciar sesión', error);
            this.loadingScreenService.showLoadingScreen(null);
            this.confirmationModalService.openModal({
              icon: ModalIconEnum.error,
              title: 'Error al autenticar',
              message: 'El usuario y/o contraseña son incorrectos.',
              accept: {
                title: 'Aceptar',
                action: () => {
                  this.confirmationModalService.closeModal();
                },
              },
            });
          },
        })
      );
    }
  }
}
