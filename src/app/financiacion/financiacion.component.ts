import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FinanciacionService } from '../service/financiacion.service';
import { Financiacion } from '../model/financiacion.model';

@Component({
  selector: 'app-financiacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './financiacion.component.html',
  styleUrls: ['./financiacion.component.scss']
})
export class FinanciacionComponent implements OnInit {
  financiaciones: Financiacion[] = [];
  form: FormGroup;
  clienteIdBusqueda: number = 0;
  mensaje: string = '';

  constructor(
    private financiacionService: FinanciacionService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      clienteId: [null, Validators.required],
      montoTotal: [null, [Validators.required, Validators.min(1)]],
      numeroCuotas: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  buscarPorCliente(): void {
    if (this.clienteIdBusqueda > 0) {
      this.financiacionService.listarPorCliente(this.clienteIdBusqueda).subscribe({
        next: (data) => this.financiaciones = data,
        error: (err) => console.error('Error al buscar financiaciones', err)
      });
    }
  }

  guardar(): void {
    if (this.form.valid) {
      this.financiacionService.crear(this.form.value).subscribe({
        next: () => {
          this.mensaje = 'Financiación creada con éxito';
          this.form.reset();
          if (this.clienteIdBusqueda > 0) this.buscarPorCliente();
        },
        error: (err) => this.mensaje = 'Error al crear la financiación'
      });
    }
  }
}