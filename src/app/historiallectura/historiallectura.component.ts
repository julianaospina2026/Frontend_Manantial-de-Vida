import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialLecturaService } from '../service/historiallectura.service';
import { Lectura } from '../model/lectura.model';

@Component({
    selector: 'app-historial-lectura',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './historiallectura.component.html',
    styleUrls: ['./historiallectura.component.scss']
})
export class HistorialLecturaComponent implements OnInit {
    historial: Lectura[] = [];
    idBusqueda: number = 0;
    cargando = false;

    constructor(private service: HistorialLecturaService) {}

    ngOnInit(): void {}
    
    buscar(): void {
        if (this.idBusqueda > 0) {
            this.cargando = true;
            this.service.obtenerHistorial(this.idBusqueda).subscribe({
                next: (data) => { 
                    this.historial = data; 
                    this.cargando = false; 
                },
                error: (err) => { 
                    console.error('Error al cargar historial', err); 
                    this.cargando = false; 
                }
            });
        }
    }
}