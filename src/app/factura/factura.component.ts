import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FacturaService } from '../service/factura.service';
import { Factura } from '../model/factura.model';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {
  factura?: Factura;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    const lecturaId = Number(this.route.snapshot.paramMap.get('lecturaId'));
    if (!lecturaId) {
      this.errorMessage = 'ID de lectura inválido para la factura.';
      this.loading = false;
      return;
    }

    this.facturaService.obtenerPorLectura(lecturaId).subscribe({
      next: (factura) => {
        this.factura = factura;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se encontró la factura vinculada a esta lectura.';
        this.loading = false;
      }
    });
  }
}
