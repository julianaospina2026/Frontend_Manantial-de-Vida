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
  lecturas: Lectura[] = [];
  currentUser: any = null;

  constructor(private lecturaService: LecturaService) {}

  ngOnInit(): void {
    const raw = localStorage.getItem('currentUser');
    this.currentUser = raw ? JSON.parse(raw) : null;
    if (this.currentUser) {
      const id = this.currentUser.username || this.currentUser.documento || this.currentUser.email;
      if (id) this.cargarLecturas(id);
    }
  }

  get totalPagadas(): number {
    return this.lecturas ? this.lecturas.filter(l => l.estado === 'PAGADA').length : 0;
  }

  cargarLecturas(username: string) {
    this.lecturaService.listarPorUsuario(username).subscribe({
      next: (list) => (this.lecturas = list || []),
      error: (err) => console.error('Error cargando lecturas usuario', err),
    });
  }

  imprimirFacturaUrl(lect: Lectura) {
    if (!lect.id) return;
    this.lecturaService.obtenerFactura(lect.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: (err) => console.error('Error obteniendo factura', err),
    });
  }
}
