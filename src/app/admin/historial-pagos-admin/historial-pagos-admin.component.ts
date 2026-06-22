import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-historial-pagos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-pagos-admin.component.html',
  styleUrls: ['./historial-pagos-admin.component.scss']
})
export class HistorialPagosAdminComponent implements OnInit {

  documentoIdentidad: string = '';

  pagos: any[] = [];            // todos los pagos
  pagosFiltrados: any[] = [];   // lo que se muestra

  constructor(private adminService: AdminService) {}

  // =========================
  // INICIALIZAR
  // =========================
  ngOnInit(): void {
    this.cargarPagos();
  }

  // =========================
  // CARGAR TODOS LOS PAGOS
  // =========================
  cargarPagos(): void {

    this.adminService.getPagos().subscribe({
      next: (data: any[]) => {
        this.pagos = data ?? [];
        this.pagosFiltrados = this.pagos; // mostrar todo al inicio
      },
      error: (err) => {
        console.error('Error al cargar pagos:', err);
      }
    });

  }

  // =========================
  // BUSCAR POR DOCUMENTO
  // =========================
  buscarPagos(): void {

    const docBuscado = String(this.documentoIdentidad ?? '').trim();

    // si no escribe nada → mostrar todo
    if (!docBuscado) {
      this.pagosFiltrados = this.pagos;
      return;
    }

    this.pagosFiltrados = this.pagos.filter((pago: any) => {

      const docCliente = String(
        pago?.factura?.cliente?.documentoIdentidad ?? ''
      ).trim();

      // búsqueda flexible
      return docCliente.includes(docBuscado);
    });

    console.log('DOC BUSCADO:', docBuscado);
    console.log('RESULTADO:', this.pagosFiltrados);
  }

  // =========================
  // LIMPIAR FILTRO
  // =========================
  limpiarFiltro(): void {
    this.documentoIdentidad = '';
    this.pagosFiltrados = this.pagos;
  }

}