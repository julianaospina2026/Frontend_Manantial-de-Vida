import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-generar-informes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './generar-informes.component.html',
  styleUrls: ['./generar-informes.component.scss']
})
export class GenerarInformesComponent {
  filtros = ['Mes actual', 'Último trimestre', 'Zona específica', 'Usuarios morosos'];
  informeSeleccionado = this.filtros[0];
  resultados = [
    { title: 'Total facturado', value: 'COP 1.840.500' },
    { title: 'Consumo promedio', value: '18.4 m³' },
    { title: 'Clientes morosos', value: '14' },
    { title: 'Lecturas pendientes', value: '27' }
  ];
}
