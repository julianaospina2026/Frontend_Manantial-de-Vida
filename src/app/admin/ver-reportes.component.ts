import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-generar-informes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-reportes.component.html',
  styleUrls: ['./ver-reportes.component.scss']
})
export class VerReportesComponent {

  resultados = [
    {
      title: 'Total facturado',
      value: 'COP 1.840.500'
    },
    {
      title: 'Consumo promedio',
      value: '18.4 m³'
    },
    {
      title: 'Clientes morosos',
      value: '14'
    },
    {
      title: 'Lecturas pendientes',
      value: '27'
    }
  ];

}
