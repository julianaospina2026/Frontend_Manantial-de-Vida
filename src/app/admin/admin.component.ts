import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private router: Router) {}

  // 🔹 TARJETAS
  summaryCards = [
    { title: 'Usuarios', value: '10', description: 'Total', accent: 'blue' },
    { title: 'Pagos', value: '$500.000', description: 'Hoy', accent: 'green' },
    { title: 'Facturas', value: '3', description: 'Pendientes', accent: 'teal' },
    { title: 'Turnos', value: '5', description: 'Mañana', accent: 'purple' }
  ];

  // 🔥 DATOS DE PRUEBA (YA NO VACÍO)
  paymentHistory = [
    { cliente: 'Juan Pérez', fecha: '2026-06-01', estado: 'Pago', monto: 200000 },
    { cliente: 'María Gómez', fecha: '2026-06-03', estado: 'Pendiente', monto: 150000 }
  ];

  invoiceHistory = [
    { cliente: 'Carlos López', fecha: '2026-06-02', estado: 'Pago', total: 300000 },
    { cliente: 'Ana Torres', fecha: '2026-06-04', estado: 'Pendiente', total: 120000 }
  ];

  financingRequests: any[] = [];
  shifts: any[] = [];

  reports: string[] = ['Reporte Mensual'];

  // 🔥 NAVEGACIÓN
  irAReporte() {
    console.log('Navegando...');
    this.router.navigate(['/admin/generar-informes']);
  }
}