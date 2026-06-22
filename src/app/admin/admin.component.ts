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
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  summaryCards: any[] = [];

  paymentHistory: Pago[] = [];
  facturaHistory: Factura[] = [];
  turnos: Turno[] = [];

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

  getClienteNombre(cliente: any): string {
    if (!cliente) return 'Sin cliente';
    if (typeof cliente === 'string') return cliente;
    if (typeof cliente === 'object') return cliente.nombre || 'Sin nombre';
    return 'Sin cliente';
  }

  cargarDashboard(): void {

    // ================= RESUMEN =================
    this.adminService.getResumenDashboard().subscribe({
      next: (data: ResumenDashboard) => {

        this.summaryCards = [
          { title: 'Usuarios', value: data?.users ?? 0, description: 'Total registrados', accent: 'azul' },
          { title: 'Pagos', value: `$${data?.paymentsToday ?? 0}`, description: 'Recaudado hoy', accent: 'verde' },
          { title: 'Facturas', value: data?.pendingInvoices ?? 0, description: 'Pendientes', accent: 'teal' },
          { title: 'Turnos', value: data?.tomorrowShifts ?? 0, description: 'Programados mañana', accent: 'morado' }
        ];

        this.cargando = false;
      },
      error: (err) => {
        console.error('ERROR RESUMEN:', err);
        this.cargando = false;
      }
    });

    // ================= PAGOS =================
    this.adminService.getPagos().subscribe({
      next: (data: Pago[]) => {
        this.paymentHistory = data ?? [];
      },
      error: (err) => console.error('ERROR PAGOS:', err)
    });

    // ================= FACTURAS =================
    this.adminService.getFacturas().subscribe({
      next: (data: Factura[]) => {

        console.log('Facturas BRUTAS:', data);

        // 🔥 FILTRO ROBUSTO (evita ID 0 o inválidos)
        this.facturaHistory = (data ?? []).filter(f => {
          const id = Number(f?.id);
          return !isNaN(id) && id > 0;
        });

        console.log('Facturas FILTRADAS:', this.facturaHistory);
      },
      error: (err) => console.error('ERROR FACTURAS:', err)
    });

    // ================= TURNOS =================
    this.adminService.getTurnos().subscribe({
      next: (data: Turno[]) => {
        this.turnos = data ?? [];
      },
      error: (err) => console.error('ERROR TURNOS:', err)
    });

    this.solicitudesFinanciamiento = [];
  }

  // ================= VER FACTURA (FIX FINAL) =================
  verFactura(factura: any): void {

    console.log('FACTURA SELECCIONADA:', factura);

    const id = Number(factura?.id);

    if (!id || id <= 0 || Number.isNaN(id)) {
      console.error('❌ Factura inválida:', factura);
      return;
    }

    this.router.navigate(['/factura', id]);
  }

  irAInicio() { this.router.navigate(['/inicio']); }
  irACrearUsuario() { this.router.navigate(['/admin/crear-usuario']); }
  irAAsignarRoles() { this.router.navigate(['/admin/asignar-roles']); }
  irATurnos() { this.router.navigate(['/admin/turnos']); }
  irAReportes() { this.router.navigate(['/admin/reportes']); }
  irAGenerarInformes() { this.router.navigate(['/admin/generar-informes']); }
}