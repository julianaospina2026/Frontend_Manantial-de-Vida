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

  constructor(
    private service: CuotaFinanciacionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.financiacionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.financiacionId) {
      this.cargarCuotas();
    }
  }

  cargarCuotas(): void {
    this.service.listarPorFinanciacion(this.financiacionId).subscribe(data => this.cuotas = data);
  }

  pagar(id?: number): void {
    if (!id) return;
    this.service.pagarCuota(id).subscribe(() => {
      alert('Pago registrado con éxito');
      this.cargarCuotas();
    });
  }
}