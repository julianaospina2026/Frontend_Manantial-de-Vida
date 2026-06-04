import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-configurar-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './configurar-turnos.component.html',
  styleUrls: ['./configurar-turnos.component.scss']
})
export class ConfigurarTurnosComponent {
  form: FormGroup;
  turnos = [
    { dia: 'Lunes', nombreFontanero: 'Laura M.', direccion: 'Vereda El Bosque', estado: 'PROGRAMADO' },
    { dia: 'Miércoles', nombreFontanero: 'Juan R.', direccion: 'Sector La Punta', estado: 'PROGRAMADO' }
  ];
  mensaje = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      dia: [''],
      nombreFontanero: [''],
      direccion: [''],
      estado: ['PROGRAMADO']
    });
  }

  guardarTurno(): void {
    const turno = this.form.value;
    if (!turno.dia || !turno.nombreFontanero || !turno.direccion) {
      this.mensaje = 'Completa los datos del turno antes de guardar.';
      return;
    }
    this.turnos = [...this.turnos, turno];
    this.form.reset({ estado: 'PROGRAMADO' });
    this.mensaje = 'Turno agregado correctamente.';
  }
}
