import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedidorService } from '../service/medidor.service';
import { Medidor } from '../model/medidor.model';

@Component({
    selector: 'app-medidor',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './medidor.component.html',
    styleUrls: ['./medidor.component.scss']
})
export class MedidorComponent implements OnInit {
    medidores: Medidor[] = [];
    selectedMedidor?: Medidor;
    searchSerial = '';
    mensaje = '';
    cargando = false;

    nuevoMedidor: Medidor = {
    serial: '',
    marca: '',
    fechaInstalacion: '',
    estado: 'NUEVO'
};

estados = [
    { value: 'NUEVO', label: 'Nuevo' },
    { value: 'USADO', label: 'Usado' },
    { value: 'DAÑADO', label: 'Dañado' }
];
constructor(private medidorService: MedidorService) {}

ngOnInit(): void {
    this.cargarMedidores();
}

cargarMedidores(): void {
    this.cargando = true;
    this.mensaje = '';
    this.medidorService.listarMedidores().subscribe({
        next: (data) => {
        this.medidores = data;
        this.cargando = false;
    },
    error: () => {
        this.mensaje = 'No se pudieron cargar los medidores. Revisa la conexión con el backend.';
        this.cargando = false;
    }
    });
}

buscarMedidor(): void {
    this.mensaje = '';
    this.selectedMedidor = undefined;

    const serial = this.searchSerial.trim();
    if (!serial) {
        this.cargarMedidores();
        return;
    }

    this.cargando = true;
    this.medidorService.obtenerPorSerial(serial).subscribe({
        next: (medidor) => {
        this.selectedMedidor = medidor;
        this.cargando = false;
    },
    error: () => {
        this.mensaje = `No se encontró ningún medidor con serial "${serial}".`;
        this.cargando = false;
    }
    });
}

crearMedidor(): void {
    this.mensaje = '';

    if (!this.nuevoMedidor.serial || !this.nuevoMedidor.marca || !this.nuevoMedidor.fechaInstalacion) {
        this.mensaje = 'Completa serial, marca y fecha de instalación.';
        return;
    }

    this.cargando = true;
    this.medidorService.crearMedidor(this.nuevoMedidor).subscribe({
        next: (medidor) => {
        this.medidores = [medidor, ...this.medidores];
        this.mensaje = 'Medidor creado correctamente.';
        this.nuevoMedidor = {
            serial: '',
            marca: '',
            fechaInstalacion: '',
            estado: 'NUEVO'
        };
        this.cargando = false;
    },
    error: () => {
        this.mensaje = 'Error al crear el medidor. Verifica los datos e intenta de nuevo.';
        this.cargando = false;
    }
    });
}
}