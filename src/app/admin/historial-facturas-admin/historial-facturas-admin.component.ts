import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FacturaService } from '../../service/factura.service';
import { Factura } from '../../model/factura.model';

@Component({
  selector: 'app-historial-facturas-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './historial-facturas-admin.component.html',
  styleUrls: ['./historial-facturas-admin.component.scss']
})
export class HistorialFacturasComponent implements OnInit {

  numeroFactura: string = '';

  facturas: Factura[] = [];
  facturasFiltradas: Factura[] = [];

  cargando = false;
  error = '';

  constructor(
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  obtenerFacturas(): void {

    this.cargando = true;
    this.error = '';

    this.facturaService.listar().subscribe({
      next: (facturas) => {

        console.log('FACTURAS CARGADAS:', facturas);

        this.facturas = facturas ?? [];
        this.facturasFiltradas = [...this.facturas];

        this.cargando = false;
      },

      error: (error) => {
        console.error(error);
        this.error = 'No fue posible cargar las facturas';
        this.cargando = false;
      }
    });
  }

  buscarFactura(): void {

    const filtro = this.numeroFactura.trim();

    if (!filtro) {
      this.facturasFiltradas = [...this.facturas];
      return;
    }

    this.facturasFiltradas = this.facturas.filter(f =>
      String(f.id).includes(filtro)
    );
  }

  limpiarBusqueda(): void {
    this.numeroFactura = '';
    this.facturasFiltradas = [...this.facturas];
  }

  verFactura(factura: Factura): void {
    console.log('Factura seleccionada:', factura);
  }
}