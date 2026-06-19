import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HistorialLecturaService } from '../service/historiallectura.service';
import { Lectura } from '../model/lectura.model';

@Component({
selector: 'app-historial-lectura',
standalone: true,
imports: [
CommonModule,
RouterModule
],
templateUrl: './historiallectura.component.html',
styleUrls: ['./historiallectura.component.scss']
})
export class HistorialLecturaComponent implements OnInit {

historial: Lectura[] = [];
cargando = false;
clienteId: number | null = null;

constructor(
private service: HistorialLecturaService
) {}

ngOnInit(): void {
this.obtenerClienteLogueado();
}

private obtenerClienteLogueado(): void {

const raw = localStorage.getItem('currentUser');

if (!raw) {
  console.error('No existe información del usuario en localStorage');
  return;
}

try {

  const currentUser = JSON.parse(raw);

  this.clienteId = Number(currentUser?.clienteId);

  if (!this.clienteId || this.clienteId <= 0) {
    console.error('Cliente ID inválido');
    return;
  }

  this.cargarHistorial();

} catch (error) {
  console.error('Error leyendo usuario de localStorage', error);
}

}

cargarHistorial(): void {

if (!this.clienteId) {
  return;
}

this.cargando = true;

this.service.obtenerHistorial(this.clienteId)
  .subscribe({

    next: (data: Lectura[]) => {
      this.historial = data || [];
      this.cargando = false;
    },

    error: (error) => {
      console.error('Error cargando historial', error);
      this.historial = [];
      this.cargando = false;
    }

  });

}
}
