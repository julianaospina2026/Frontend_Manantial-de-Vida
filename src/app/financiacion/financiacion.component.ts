import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FinanciacionService } from '../service/financiacion.service';
import { FacturaService } from '../service/factura.service';
import { AuthService } from '../service/auth.service';

import { Financiacion } from '../model/financiacion.model';
import { FinanciacionRequest } from '../model/financiacion-request.model';
import { Factura } from '../model/factura.model';

@Component({
  selector: 'app-financiacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './financiacion.component.html',
  styleUrls: ['./financiacion.component.scss']
})
export class FinanciacionComponent implements OnInit {

  // =========================
  // DATOS PRINCIPALES
  // =========================
  clienteId!: number;

  facturasPendientes: Factura[] = [];
  facturasSeleccionadas: Factura[] = [];
  financiaciones: Financiacion[] = [];

  // =========================
  // SIMULADOR
  // =========================
  montoSeleccionado = 0;
  cuotasSeleccionadas = 6;
  valorCuota = 0;

  // =========================
  // UI
  // =========================
  mensaje = '';

  constructor(
    private financiacionService: FinanciacionService,
    private facturaService: FacturaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    const user = this.authService.getUser();
    console.log('USUARIO LOGUEADO:', user);

    const id = this.authService.getClienteId();
    console.log('CLIENTE ID:', id);

    if (!id) {
      console.error('Cliente no identificado');
      return;
    }

    this.clienteId = id;

    this.cargarFacturasPendientes();
    this.cargarFinanciaciones();
  }

  // =========================
  // TOTAL PENDIENTE (FIX ERROR NG)
  // =========================
  get totalPendiente(): number {
    return this.facturasPendientes.reduce(
      (total, factura) => total + (factura.totalPagar || 0),
      0
    );
  }

  // =========================
  // FACTURAS PENDIENTES
  // =========================
  cargarFacturasPendientes(): void {

    this.facturaService.listarPendientes(this.clienteId)
      .subscribe({
        next: (data) => {
          console.log('FACTURAS PENDIENTES:', data);
          this.facturasPendientes = data || [];
        },
        error: (err) => {
          console.error('Error cargando facturas pendientes', err);
        }
      });
  }

  // =========================
  // FINANCIACIONES
  // =========================
  cargarFinanciaciones(): void {

    this.financiacionService.listarPorCliente(this.clienteId)
      .subscribe({
        next: (data) => {
          console.log('FINANCIACIONES:', data);
          this.financiaciones = data || [];
        },
        error: (err) => {
          console.error('Error cargando financiaciones', err);
        }
      });
  }

  // =========================
  // SELECCIÓN FACTURAS
  // =========================
  toggleFactura(factura: Factura): void {

    const index = this.facturasSeleccionadas
      .findIndex(f => f.id === factura.id);

    if (index >= 0) {
      this.facturasSeleccionadas.splice(index, 1);
    } else {
      this.facturasSeleccionadas.push(factura);
    }

    this.actualizarSimulador();
  }

  estaSeleccionada(factura: Factura): boolean {
    return this.facturasSeleccionadas
      .some(f => f.id === factura.id);
  }

  // =========================
  // SIMULADOR
  // =========================
  actualizarSimulador(): void {

    this.montoSeleccionado = this.facturasSeleccionadas.reduce(
      (total, factura) => total + (factura.totalPagar || 0),
      0
    );

    this.calcularCuota();
  }

  calcularCuota(): void {

    if (!this.cuotasSeleccionadas || this.cuotasSeleccionadas <= 0) {
      this.valorCuota = 0;
      return;
    }

    this.valorCuota = this.montoSeleccionado / this.cuotasSeleccionadas;
  }

  // =========================
  // CREAR FINANCIACIÓN
  // =========================
  crearFinanciacion(): void {

    if (this.facturasSeleccionadas.length === 0) {
      alert('Seleccione al menos una factura');
      return;
    }

    const payload: FinanciacionRequest = {
      cliente: { id: this.clienteId },
      montoTotal: this.montoSeleccionado,
      cuotasTotales: this.cuotasSeleccionadas,
      concepto: 'Financiación de facturas pendientes',
      valorCuota: this.valorCuota
    };

    console.log('PAYLOAD:', payload);

    this.financiacionService.crear(payload)
      .subscribe({
        next: (resp) => {
          console.log('FINANCIACIÓN CREADA:', resp);

          this.mensaje = 'Financiación creada correctamente';

          this.facturasSeleccionadas = [];
          this.montoSeleccionado = 0;
          this.valorCuota = 0;

          this.cargarFacturasPendientes();
          this.cargarFinanciaciones();
        },
        error: (err) => {
          console.error('Error creando financiación', err);
          this.mensaje = 'No fue posible crear la financiación';
        }
      });
  }

  // =========================
  // ESTADO FINANCIACIÓN
  // =========================
  esFinalizada(financiacion: Financiacion): boolean {
    return financiacion.cuotasPagadas >= financiacion.cuotasTotales;
  }
}