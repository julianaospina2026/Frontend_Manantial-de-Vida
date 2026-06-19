import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import {
  AdminService,
  ResumenDashboard,
  Pago,
  Factura,
  Turno
} from '../service/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // =========================
  // DASHBOARD
  // =========================
  summaryCards: any[] = [];

  // =========================
  // TABLAS
  // =========================
  paymentHistory: Pago[] = [];
  facturaHistory: Factura[] = [];
  turnos: Turno[] = [];

  // =========================
  // OTROS DATOS
  // =========================
  solicitudesFinanciamiento: any[] = [];

  reportes: string[] = [
    'Reporte mensual',
    'Reporte de pagos',
    'Reporte de facturación'
  ];

  cargando = true;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  // =========================
  // CLIENTE SEGURO
  // =========================
  getClienteNombre(cliente: any): string {

    if (!cliente) {
      return 'Sin cliente';
    }

    if (typeof cliente === 'string') {
      return cliente;
    }

    if (typeof cliente === 'object') {
      return cliente.nombre || 'Sin nombre';
    }

    return 'Sin cliente';
  }

  // =========================
  // CARGAR DASHBOARD
  // =========================
  cargarDashboard(): void {

    this.adminService.getResumenDashboard().subscribe({
      next: (data: ResumenDashboard) => {

        this.summaryCards = [
          {
            title: 'Usuarios',
            value: data.users ?? 0,
            description: 'Total registrados',
            accent: 'azul'
          },
          {
            title: 'Pagos',
            value: `$${data.paymentsToday ?? 0}`,
            description: 'Recaudado hoy',
            accent: 'verde'
          },
          {
            title: 'Facturas',
            value: data.pendingInvoices ?? 0,
            description: 'Pendientes',
            accent: 'teal'
          },
          {
            title: 'Turnos',
            value: data.tomorrowShifts ?? 0,
            description: 'Programados mañana',
            accent: 'morado'
          }
        ];

        this.cargando = false;
      },

      error: (err) => {
        console.error('Error dashboard:', err);
        this.cargando = false;
      }
    });

    // =========================
    // PAGOS
    // =========================
    this.adminService.getPagos().subscribe({
      next: (data: Pago[]) => {
        console.log('Pagos:', data);
        this.paymentHistory = data ?? [];
      },
      error: (err) => {
        console.error('Error pagos:', err);
      }
    });

    // =========================
    // FACTURAS
    // =========================
    this.adminService.getFacturas().subscribe({
      next: (data: Factura[]) => {
        console.log('Facturas:', data);
        this.facturaHistory = data ?? [];
      },
      error: (err) => {
        console.error('Error facturas:', err);
      }
    });

    // =========================
    // TURNOS
    // =========================
    this.adminService.getTurnos().subscribe({
      next: (data: Turno[]) => {
        console.log('Turnos:', data);
        this.turnos = data ?? [];
      },
      error: (err) => {
        console.error('Error turnos:', err);
      }
    });
  }

  // =========================
  // NAVEGACIÓN
  // =========================
  irAInicio(): void {
    this.router.navigate(['/inicio']);
  }

  irACrearUsuario(): void {
    this.router.navigate(['/admin/crear-usuario']);
  }

  irAAsignarRoles(): void {
    this.router.navigate(['/admin/asignar-roles']);
  }

  irATurnos(): void {
    this.router.navigate(['/admin/turnos']);
  }

  irAReportes(): void {
    this.router.navigate(['/admin/reportes']);
  }

  irAGenerarInformes(): void {
    this.router.navigate(['/admin/generar-informes']);
  }
}