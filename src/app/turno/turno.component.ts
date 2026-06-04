import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnoService } from '../service/turno.service';
import { Turno } from '../model/turno.model';

@Component({
    selector: 'app-turno',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './turno.component.html',
    styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {
    turnos: Turno[] = [];
    nuevoTurno: any = { clienteId: null, fecha: '', motivo: '', estado: 'PENDIENTE' };
    cargando: boolean = false;

    constructor(private service: TurnoService) {}

    ngOnInit(): void {
    this.listar();
}

listar(): void {
    this.cargando = true;
    this.service.listar().subscribe({
        next: (data) => { this.turnos = data; this.cargando = false; },
        error: () => this.cargando = false
    });
}

programar(): void {
    if (this.nuevoTurno.clienteId && this.nuevoTurno.fecha) {
        this.service.programar(this.nuevoTurno).subscribe(() => {
        this.listar();
        this.nuevoTurno = { clienteId: null, fecha: '', motivo: '', estado: 'PENDIENTE' };
    });
    }
}

cambiarEstado(id: number | undefined, estado: string): void {
    if (!id) return;
    this.service.actualizarEstado(id, estado).subscribe({
        next: () => {
        const t = this.turnos.find(item => item.id === id);
        if (t) t.estado = estado;
    },
    error: (err) => alert('Error al actualizar estado')
    });
}
}