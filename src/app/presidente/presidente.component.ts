import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresidenteService } from '../service/presidente.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-presidente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presidente.component.html',
  styleUrls: ['./presidente.component.scss']
})
export class PresidenteComponent implements OnInit {

  dashboard: any = null;
  lecturas: any[] = [];
  pagos: any[] = [];

  loading = true;
  error: string | null = null;

  constructor(
    private presidenteService: PresidenteService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {

    this.loading = true;
    this.error = null;

    forkJoin({
      dashboard: this.presidenteService.getDashboard(),
      lecturas: this.presidenteService.getLecturas(),
      pagos: this.presidenteService.getPagos()
    }).subscribe({

      next: (res) => {

        console.log('DASHBOARD:', res.dashboard);
        console.log('LECTURAS:', res.lecturas);
        console.log('PAGOS:', res.pagos);

        this.dashboard = res.dashboard;
        this.lecturas = res.lecturas;
        this.pagos = res.pagos;

        this.loading = false;
      },

      error: (err) => {

        console.error('ERROR PRESIDENTE:', err);

        this.error =
          'Error al cargar la información estratégica del panel.';

        this.loading = false;
      }
    });
  }

  get totalLecturas(): number {
    return this.lecturas.length;
  }

  get totalPagos(): number {
    return this.pagos.length;
  }
}