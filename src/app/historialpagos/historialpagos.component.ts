import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialPagosService } from '../service/historialpagos.service';
import { Pago } from '../model/pago.model';

@Component({
    selector: 'app-historial-pagos',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './historialpagos.component.html',
    styleUrls: ['./historialpagos.component.scss']
})
export class HistorialPagosComponent {
    pagos: Pago[] = [];
    clienteId: number | null = null;
    loading = false;
    
    constructor(private service: HistorialPagosService) {}

cargar() {
    if (this.clienteId) {
        this.loading = true;
        this.service.obtenerPagosCliente(this.clienteId).subscribe({
        next: (data) => {
            this.pagos = data;
            this.loading = false;
        },
        error: () => this.loading = false
    });
    }
}
}