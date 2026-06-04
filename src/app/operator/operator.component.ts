import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Lectura } from '../model/lectura.model';
import { LecturaService } from '../service/lectura.service';


@Component({
  selector: 'app-operator',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  pendientes: Lectura[] = [];

  constructor(private lecturaService: LecturaService) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  cargarPendientes() {
    this.lecturaService.listarPendientes().subscribe({
      next: (list) => (this.pendientes = list || []),
      error: (err) => console.error('Error cargando lecturas pendientes', err),
    });
  }

  marcarRealizada(lect: Lectura) {
    if (!lect.id) return;
    this.lecturaService.marcarRealizada(lect.id).subscribe({
      next: () => this.cargarPendientes(),
      error: (err) => console.error('Error marcando lectura', err),
    });
  }
}
