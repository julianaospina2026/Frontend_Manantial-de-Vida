import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface DashboardCard {
  title: string;
  value: string;
  description: string;
  accent: string;
}

interface HistoryRecord {
  id: string;
  cliente: string;
  fecha: string;
  estado: string;
  monto: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  summaryCards: DashboardCard[] = [
    { title: 'Pagos recibidos', value: '128', description: 'Transacciones registradas', accent: 'blue' },
    { title: 'Facturas emitidas', value: '83', description: 'Lista de facturas generadas', accent: 'green' },
    { title: 'Solicitudes de financiamiento', value: '12', description: 'Nuevos casos pendientes', accent: 'teal' },
    { title: 'Usuarios activos', value: '245', description: 'Suscriptores conectados', accent: 'purple' }
  ];

  paymentHistory: HistoryRecord[] = [
    { id: 'P-1872', cliente: 'Juan Pérez', fecha: '02 Jun 2026', estado: 'Pagado', monto: 'COP 85.400' },
    { id: 'P-1873', cliente: 'María Gómez', fecha: '02 Jun 2026', estado: 'Pendiente', monto: 'COP 76.200' },
    { id: 'P-1874', cliente: 'Carlos Ruiz', fecha: '01 Jun 2026', estado: 'Pagado', monto: 'COP 92.700' }
  ];

  invoiceHistory: HistoryRecord[] = [
    { id: 'F-3341', cliente: 'Claudia Torres', fecha: '28 May 2026', estado: 'Vencida', monto: 'COP 120.500' },
    { id: 'F-3342', cliente: 'Luis Fernández', fecha: '29 May 2026', estado: 'Pagada', monto: 'COP 98.300' },
    { id: 'F-3343', cliente: 'Andrea Rojas', fecha: '30 May 2026', estado: 'Pendiente', monto: 'COP 74.100' }
  ];

  financingRequests = [
    { cliente: 'Pedro Salas', monto: 'COP 450.000', estado: 'En revisión' },
    { cliente: 'Ana Molina', monto: 'COP 390.000', estado: 'Aprobado' }
  ];

  shifts = [
    { dia: 'Lunes', operador: 'Laura M.', hora: '08:00 - 12:00' },
    { dia: 'Miércoles', operador: 'Juan R.', hora: '13:00 - 17:00' },
    { dia: 'Viernes', operador: 'Andrea F.', hora: '09:00 - 14:00' }
  ];

  reports = [
    'Resumen de facturación mensual',
    'Reporte de pagos por sector',
    'Informe de lecturas pendientes',
    'Estadísticas de usuarios por estrato'
  ];
}

