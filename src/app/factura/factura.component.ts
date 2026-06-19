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

  // =========================
  // 📦 ESTADO GENERAL
  // =========================
  factura?: Factura;
  loading: boolean = true;
  errorMessage: string = '';

  // =========================
  // 🧠 MODALES
  // =========================
  mostrarModalSeleccion: boolean = false;
  mostrarModalCorreo: boolean = false;

  // =========================
  // 📧 CORREO
  // =========================
  correoEditable: string = '';

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {

    const lecturaId = Number(
      this.route.snapshot.paramMap.get('lecturaId')
    );

    console.log('Lectura ID recibido:', lecturaId);

    if (!lecturaId || isNaN(lecturaId)) {
      this.errorMessage = 'ID de lectura inválido para la factura.';
      this.loading = false;
      return;
    }

    this.facturaService.obtenerPorLectura(lecturaId).subscribe({
      next: (factura: Factura) => {
        this.factura = factura;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se encontró la factura vinculada a esta lectura.';
        this.loading = false;
      }
    });
  }

  // =========================
  // 🖨️ ABRIR MODAL
  // =========================
  imprimirFactura(): void {
    this.mostrarModalSeleccion = true;
  }

  // =========================
  // 📧 ENVIAR POR CORREO
  // =========================
  seleccionarCorreo(): void {

    this.mostrarModalSeleccion = false;

    this.correoEditable =
      this.factura?.lectura?.cliente?.correo || '';

    this.mostrarModalCorreo = true;
  }

  // =========================
  // 🖨️ IMPRESIÓN FÍSICA (FIX ROBUSTO)
  // =========================
  imprimirFisica(): void {

    this.mostrarModalSeleccion = false;
    this.mostrarModalCorreo = false;

    // 🔥 FIX IMPORTANTE:
    // esperar 2 ciclos de render para asegurar DOM limpio
    setTimeout(() => {
      requestAnimationFrame(() => {
        window.print();
      });
    }, 150);
  }

  // =========================
  // 📧 VALIDACIÓN EMAIL
  // =========================
  validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // =========================
  // 📧 CONFIRMAR ENVÍO
  // =========================
  confirmarEnvioCorreo(): void {

    if (!this.correoEditable || !this.validarEmail(this.correoEditable)) {
      alert('Correo inválido, corrígelo');
      return;
    }

    this.mostrarModalCorreo = false;

    alert(`Factura enviada al correo: ${this.correoEditable}`);

    // 👉 backend real aquí
    // this.facturaService.enviarCorreo(this.factura?.id, this.correoEditable)
  }
}