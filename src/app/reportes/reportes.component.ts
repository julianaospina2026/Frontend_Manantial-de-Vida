import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../service/reportes.service';

@Component({
    selector: 'app-reportes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reportes.component.html',
    styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  periodo: string = new Date().toISOString().substring(0, 7); // yyyy-MM
    recaudoTotal: number = 0;
    clientesMora: number = 0;
    cargando: boolean = false;

    constructor(private service: ReportesService) {}
    
    ngOnInit(): void {
    this.cargarEstadisticas();
}

cargarEstadisticas(): void {
    this.cargando = true;
    // Recaudo mensual
    this.service.obtenerRecaudoMes(this.periodo).subscribe(data => {
      // Asumimos que el backend devuelve un Map o un objeto con el valor total
    this.recaudoTotal = Object.values(data)[0] as number || 0;
    });

    // Clientes en mora
    this.service.contarClientesEnMora().subscribe(count => {
    this.clientesMora = count;
    this.cargando = false;
    });
}
}