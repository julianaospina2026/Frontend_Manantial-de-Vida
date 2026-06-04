import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagoService } from '../service/pago.service';
import { Pago } from '../model/pago.model';

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
    metodos = ['EFECTIVO', 'PSE', 'TARJETA'];
    
    constructor(private fb: FormBuilder, private service: PagoService) {
    this.form = this.fb.group({
        facturaId: [null, [Validators.required, Validators.min(1)]],
        monto: [null, [Validators.required, Validators.min(0)]],
        metodoPago: ['EFECTIVO', Validators.required],
        fechaPago: [new Date().toISOString().substring(0, 10), Validators.required]
    });
}

registrar(): void {
    if (this.form.valid) {
        const data: Pago = this.form.value;
        this.service.registrarPago(data).subscribe({
        next: (res) => {
            
            this.mensaje = 'Pago registrado exitosamente para la factura #' + res.facturaId;
            this.form.reset({
            metodoPago: 'EFECTIVO',
            fechaPago: new Date().toISOString().substring(0, 10)
        });
        setTimeout(() => this.mensaje = '', 5000);
        },
        error: (err) => {
            this.mensaje = 'Error al registrar el pago. Verifique los datos.';
        }
    });
    } else {
        this.form.markAllAsTouched();
    }
}
}