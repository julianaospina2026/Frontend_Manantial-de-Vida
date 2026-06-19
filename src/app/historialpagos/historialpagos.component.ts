import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HistorialPagosService } from '../service/historialpagos.service';
import { Pago } from '../model/pago.model';

@Component({
  selector: 'app-historial-pagos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './historialpagos.component.html',
  styleUrls: ['./historialpagos.component.scss']
})
export class HistorialPagosComponent implements OnInit {

  pagos: Pago[] = [];
  loading = false;
  clienteId: number | null = null;

  constructor(
    private service: HistorialPagosService
  ) {}

  ngOnInit(): void {
    this.obtenerClienteId();
    this.cargarPagosUsuario();
  }

  // =========================
  // OBTENER CLIENTE ID
  // =========================
  obtenerClienteId(): void {

    const userString = localStorage.getItem('currentUser');

    if (!userString) {
      console.error('No hay usuario en localStorage');
      return;
    }

    try {
      const user = JSON.parse(userString);
      this.clienteId = user.clienteId;

      console.log('CLIENTE ID EXTRAÍDO:', this.clienteId);

    } catch (error) {
      console.error('Error parseando currentUser:', error);
    }
  }

  // =========================
  // CARGAR PAGOS
  // =========================
  cargarPagosUsuario(): void {

    if (!this.clienteId) {
      console.error('Cliente ID no disponible');
      return;
    }

    this.loading = true;

    this.service.obtenerPagosCliente(this.clienteId).subscribe({

      next: (data: Pago[]) => {

        this.pagos = data || [];
        this.loading = false;

        console.log('Pagos encontrados:', data);
      },

      error: (error) => {

        console.error('Error cargando pagos:', error);
        this.loading = false;
      }

    });
  }
}