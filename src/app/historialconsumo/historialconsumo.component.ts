import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialConsumoService } from '../service/historialconsumo.service';
import { Lectura } from '../model/lectura.model';

@Component({
    selector: 'app-historial-consumo',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './historialconsumo.component.html',
    styleUrls: ['./historialconsumo.component.scss']
})
export class HistorialConsumoComponent {
    lecturas: Lectura[] = [];
    clienteId: number | null = null;
    cargando: boolean = false;
    error: string = '';

    constructor(private service: HistorialConsumoService) {}

    consultar(): void {
        if (this.clienteId) {
            this.cargando = true;
            this.error = '';
            this.service.obtenerPorCliente(this.clienteId).subscribe({
                next: (data) => {
                    this.lecturas = data;
                    this.cargando = false;
                },
                error: (err) => {
                    this.error = 'No se encontró historial para el ID ingresado.';
                    this.cargando = false;
                }
            });
        }
    }
}