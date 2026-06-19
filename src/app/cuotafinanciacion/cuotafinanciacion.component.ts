import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CuotaFinanciacionService } from '../service/cuotafinanciacion.service';
import { CuotaFinanciacion } from '../model/cuotafinanciacion.model';

@Component({
  selector: 'app-cuotas-financiacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuotafinanciacion.component.html',
  styleUrls: ['./cuotafinanciacion.component.scss']
})
export class CuotaFinanciacionComponent implements OnInit {

  cuotas: CuotaFinanciacion[] = [];
  financiacionId: number = 0;

  loading: boolean = false;

  constructor(
    private service: CuotaFinanciacionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.financiacionId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(this.financiacionId) || this.financiacionId <= 0) {
      console.error('ID de financiación inválido');
      return;
    }

    this.cargarCuotas();
  }

  // =========================
  // CARGAR CUOTAS
  // =========================
  cargarCuotas(): void {
    this.loading = true;

    this.service.listarPorFinanciacion(this.financiacionId)
      .subscribe({
        next: (data) => {
          this.cuotas = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando cuotas', err);
          this.loading = false;
        }
      });
  }

  // =========================
  // PAGAR CUOTA
  // =========================
  pagar(id?: number): void {
    if (!id) return;

    this.service.pagarCuota(id)
      .subscribe({
        next: () => {
          alert('Pago registrado con éxito');
          this.cargarCuotas();
        },
        error: (err) => {
          console.error('Error al pagar cuota', err);
          alert('Error al registrar el pago');
        }
      });
  }
}