import { Component } from '@angular/core';

@Component({
  selector: 'app-reporte-mensual',
  templateUrl: './reporte-mensual.component.html',
  styleUrls: ['./reporte-mensual.component.scss']
})
export class ReporteMensualComponent {

  mesSeleccionado: string = '';
  reporte: any = null;

  generarReporte() {
    // 🔥 Aquí luego conectas con Spring Boot
    console.log('Generando reporte para:', this.mesSeleccionado);

    // Simulación de datos
    this.reporte = {
      ingresos: 5000000,
      egresos: 2000000,
      balance: 3000000,
      detalle: [
        { fecha: '2026-06-01', tipo: 'Ingreso', valor: 2000000 },
        { fecha: '2026-06-05', tipo: 'Egreso', valor: 500000 },
        { fecha: '2026-06-10', tipo: 'Ingreso', valor: 3000000 }
      ]
    };
  }
}