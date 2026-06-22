import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FacturaService } from '../service/factura.service';
import { Factura } from '../model/factura.model';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  factura?: Factura;
  loading: boolean = true;
  errorMessage: string = '';

  mostrarModalSeleccion: boolean = false;
  mostrarModalCorreo: boolean = false;

  correoEditable: string = '';

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {

    // 🔥 FIX PRINCIPAL
    const param = this.route.snapshot.paramMap.get('id');
    const id = Number(param);

    console.log('Factura ID recibido:', id);

    if (!param || isNaN(id) || id <= 0) {
      this.errorMessage = 'ID de factura inválido';
      this.loading = false;
      return;
    }

    // =========================
    // 📡 PETICIÓN CORRECTA
    // =========================
    this.facturaService.obtenerPorId(id).subscribe({
      next: (factura: Factura | null) => {

        if (!factura) {
          this.errorMessage = 'No se encontró la factura.';
          this.loading = false;
          return;
        }

        this.factura = factura;
        this.loading = false;
      },

      error: (err) => {
        console.error('ERROR FACTURA:', err);
        this.errorMessage = 'No se pudo cargar la factura.';
        this.loading = false;
      }
    });
  }

  imprimirFactura(): void {
    this.mostrarModalSeleccion = true;
  }

  seleccionarCorreo(): void {

    this.mostrarModalSeleccion = false;

    this.correoEditable =
      this.factura?.lectura?.cliente?.correo || '';

    this.mostrarModalCorreo = true;
  }

  imprimirFisica(): void {

    this.mostrarModalSeleccion = false;
    this.mostrarModalCorreo = false;

    setTimeout(() => {
      requestAnimationFrame(() => {
        window.print();
      });
    }, 150);
  }

  validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  confirmarEnvioCorreo(): void {

    if (!this.correoEditable || !this.validarEmail(this.correoEditable)) {
      alert('Correo inválido, corrígelo');
      return;
    }

    this.mostrarModalCorreo = false;

    alert(`Factura enviada al correo: ${this.correoEditable}`);

    // backend real
    // this.facturaService.enviarCorreo(this.factura?.id, this.correoEditable)
  }
}