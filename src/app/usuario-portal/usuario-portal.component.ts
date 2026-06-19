import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Lectura } from '../model/lectura.model';
import { LecturaService } from '../service/lectura.service';
import { FinanciacionService } from '../service/financiacion.service';

@Component({
  selector: 'app-usuario-portal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-portal.component.html',
  styleUrls: ['./usuario-portal.component.scss']
})
export class UsuarioPortalComponent implements OnInit {

  // =========================
  // DATOS DEL USUARIO
  // =========================

  currentUser: any = null;
  usuario: any = {};

  // =========================
  // RESUMEN
  // =========================

  lecturas: Lectura[] = [];

  totalFinanciaciones = 0;
  totalPagado = 0;

  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(
    private lecturaService: LecturaService,
    private financiacionService: FinanciacionService
  ) {}

  // =========================
  // INICIO
  // =========================

  ngOnInit(): void {
    this.cargarUsuario();
  }

  // =========================
  // CARGAR USUARIO
  // =========================

  private cargarUsuario(): void {

    const rawUser = localStorage.getItem('currentUser');

    if (!rawUser) {
      console.warn('No existe usuario en sesión');
      return;
    }

    this.currentUser = JSON.parse(rawUser);
    this.usuario = this.currentUser?.profile || {};

    console.log('Usuario cargado:', this.usuario);

    const clienteId = Number(
      this.currentUser?.clienteId ??
      this.usuario?.clienteId
    );

    if (!clienteId) {
      console.warn('ClienteId no encontrado');
      return;
    }

    this.cargarResumen(clienteId);
  }

  // =========================
  // RESUMEN DASHBOARD
  // =========================

  private cargarResumen(clienteId: number): void {

    this.cargarLecturas(clienteId);
    this.cargarFinanciaciones(clienteId);
  }

  // =========================
  // LECTURAS
  // =========================

  private cargarLecturas(clienteId: number): void {

    this.lecturaService
      .listarPorUsuario(clienteId)
      .subscribe({

        next: (data) => {
          this.lecturas = data || [];
        },

        error: (err) => {
          console.error('Error cargando lecturas', err);
        }
      });
  }

  // =========================
  // FINANCIACIONES
  // =========================

  private cargarFinanciaciones(clienteId: number): void {

    this.financiacionService
      .listarPorCliente(clienteId)
      .subscribe({

        next: (data) => {

          this.totalFinanciaciones = data?.length || 0;

          this.totalPagado = data.reduce(
            (total, financiacion) =>
              total +
              ((financiacion.cuotasPagadas || 0) *
              (financiacion.valorCuota || 0)),
            0
          );
        },

        error: (err) => {
          console.error('Error cargando financiaciones', err);
        }
      });
  }

  // =========================
  // MÉTRICAS
  // =========================

  get totalLecturas(): number {
    return this.lecturas.length;
  }

  get lecturasConConsumo(): number {
    return this.lecturas.filter(
      lectura => (lectura.consumoM3 ?? 0) > 0
    ).length;
  }

  // =========================
  // DATOS VISUALES
  // =========================

  get nombreUsuario(): string {
    return this.usuario?.nombreCompleto || 'Usuario';
  }

  get correoUsuario(): string {
    return this.usuario?.email || 'Sin correo';
  }

  get cedulaUsuario(): string {
    return this.usuario?.cedula || 'No registrada';
  }

}