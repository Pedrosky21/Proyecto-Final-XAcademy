import { Component } from '@angular/core';
import { EditInputs } from '../../../model/edit-inputs';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  EditItems: EditInputs[] = [
    { name: 'Nombre', type: 'text' },
    { name: 'Apellido', type: 'text' },
    { name: 'Fecha de Nacimiento', type: 'date' },
    { name: 'Telefono', type: 'tel' },
    { name: 'Imagen de Perfil ', type: 'file' },
    // Estos options deberian venir de la BBDD
    {
      name: 'Posicion',
      type: 'select',
      options: ['Delantero', 'Mediocampista', 'Defensor', 'Arquero'],
    },
    {
      name: 'Categoria',
      type: 'select',
      options: ['Sub-15', 'Sub-18', 'Sub-21', 'Libre'],
    },
  ];
}
