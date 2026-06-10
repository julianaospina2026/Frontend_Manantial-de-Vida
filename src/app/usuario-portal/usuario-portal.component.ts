import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Lectura } from '../model/lectura.model';
import { LecturaService } from '../service/lectura.service';

@Component({
  selector: 'app-usuario-portal',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './usuario-portal.component.html',
  styleUrls: ['./usuario-portal.component.scss']
})
export class UsuarioPortalComponent implements OnInit {

  // ========================
  // DATOS DEL USUARIO
  // ========================
  currentUser: any = null;
  usuario: any = {}; // 👉 aquí guardamos profile limpio

  // ========================
  // DATOS DEL SISTEMA
  // ========================
  lecturas: Lectura[] = [];
  lecturaActual: Lectura | null = null;

  constructor(private lecturaService: LecturaService) {}

  // ========================
  // INIT
  // ========================
  ngOnInit(): void {

    // 🔥 Obtener usuario del localStorage
    const raw = localStorage.getItem('currentUser');
    this.currentUser = raw ? JSON.parse(raw) : null;

    if (this.currentUser) {

      // ✅ PERFIL LIMPIO
      this.usuario = this.currentUser.profile || {};

      console.log('USUARIO COMPLETO:', this.currentUser);
      console.log('DATOS PERFIL:', this.usuario);

      // ✅ ID CORREGIDO
      const id =
        this.usuario?.username ||
        this.currentUser?.documento ||
        this.usuario?.email;

      if (id) {
        this.cargarLecturas(id);
      } else {
        console.warn('No se encontró identificador del usuario');
      }
    } else {
      console.warn('No hay usuario en localStorage');
    }
  }

  // ========================
  // LECTURAS
  // ========================
  cargarLecturas(username: string) {
    this.lecturaService.listarPorUsuario(username).subscribe({
      next: (list) => {
        this.lecturas = list || [];

        // ✅ última lectura
        this.lecturaActual = this.lecturas.length
          ? this.lecturas[this.lecturas.length - 1]
          : null;
      },
      error: (err) => console.error('Error cargando lecturas usuario', err),
    });
  }

  // ========================
  // PAGOS (calculado)
  // ========================
  get totalPagadas(): number {
    return this.lecturas
      ? this.lecturas.filter(l => l.estado === 'PAGADA').length
      : 0;
  }

  // ========================
  // FACTURAS (pendientes)
  // ========================
  get facturasDisponibles(): number {
    return this.lecturas
      ? this.lecturas.filter(l => l.estado === 'PENDIENTE').length
      : 0;
  }

  // ========================
  // DESCARGAR FACTURA
  // ========================
  imprimirFacturaUrl(lect: Lectura) {
    if (!lect?.id) return;

    this.lecturaService.obtenerFactura(lect.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: (err) => console.error('Error obteniendo factura', err),
    });
  }
}