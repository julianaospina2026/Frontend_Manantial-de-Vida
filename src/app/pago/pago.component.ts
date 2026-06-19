import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { PagoService } from '../service/pago.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent {

  form: FormGroup;
  mensaje: string = '';
  loading: boolean = false;

  metodos: string[] = ['EFECTIVO', 'PSE', 'TARJETA'];

  constructor(
    private fb: FormBuilder,
    private service: PagoService,
    private router: Router
  ) {

    this.form = this.fb.group({
      facturaId: [null, [Validators.required, Validators.min(1)]],
      monto: [null, [Validators.required, Validators.min(1)]],
      metodoPago: ['EFECTIVO', Validators.required]
    });
  }

  registrar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensaje = 'Complete todos los campos correctamente.';
      return;
    }

    this.loading = true;
    this.mensaje = '';

    const data = {
      monto: Number(this.form.value.monto),
      metodoPago: this.form.value.metodoPago,
      factura: {
        id: Number(this.form.value.facturaId)
      }
    };

    console.log('📦 DATA ENVIADA:', JSON.stringify(data));

    this.service.registrarPago(data as any).subscribe({

      next: (res) => {

        console.log('✅ PAGO REGISTRADO:', res);

        this.loading = false;
        this.mensaje = '✅ Pago registrado exitosamente';

        // 🔥 IMPORTANTE: usar SOLO facturaId (NO pagoId ambiguo)
        const facturaId = res.facturaId || res.recibo?.facturaId;

        if (!facturaId) {
          console.error('❌ No se recibió facturaId:', res);
          alert('El pago fue registrado, pero no se recibió el ID de la factura.');
          return;
        }

        // =====================================================
        // 🔥 AQUÍ SALE LA PREGUNTA REAL
        // =====================================================
        const opcion = confirm(
          'Pago registrado correctamente.\n\n' +
          '¿Cómo desea recibir el recibo?\n\n' +
          'Aceptar = Descargar PDF\nCancelar = Enviar por correo'
        );

        if (opcion) {

          // =========================
          // 📄 DESCARGAR PDF
          // =========================
          this.service.descargarRecibo(facturaId).subscribe({

            next: (pdf: Blob) => {

              const blob = new Blob([pdf], { type: 'application/pdf' });
              const url = window.URL.createObjectURL(blob);

              const a = document.createElement('a');
              a.href = url;
              a.download = `recibo-${facturaId}.pdf`;

              document.body.appendChild(a);
              a.click();

              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            },

            error: (err) => {
              console.error('❌ Error descargando PDF:', err);
              alert('No fue posible descargar el recibo.');
            }
          });

        } else {

          // =========================
          // 📧 ENVIAR POR CORREO
          // =========================
          this.service.enviarRecibo(facturaId).subscribe({

            next: () => {
              alert('📧 Recibo enviado por correo exitosamente');
            },

            error: (err) => {
              console.error('❌ Error enviando correo:', err);
              alert('No fue posible enviar el correo.');
            }
          });
        }

        this.resetForm();

        setTimeout(() => {
          this.mensaje = '';
        }, 3000);
      },

      error: (err) => {

        console.error('❌ ERROR AL REGISTRAR:', err);

        this.mensaje =
          typeof err.error === 'string'
            ? err.error
            : '❌ Error al registrar el pago';

        this.loading = false;
      }
    });
  }

  imprimirRecibo(): void {
    window.print();
  }

  verHistorial(): void {
    this.router.navigate(['/portal-usuario/historial-pagos']);
  }

  private resetForm(): void {
    this.form.reset({
      facturaId: null,
      monto: null,
      metodoPago: 'EFECTIVO'
    });
  }
}