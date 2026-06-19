import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router,
  RouterModule
} from '@angular/router';

import { LecturaService } from '../service/lectura.service';

@Component({
  selector: 'app-registrar-lectura',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './registrar-lectura.component.html',
  styleUrls: ['./registrar-lectura.component.scss']
})
export class RegistrarLecturaComponent implements OnInit {

  form!: FormGroup;

  cargando = false;
  mensaje = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: LecturaService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // =========================
  // INICIALIZAR FORMULARIO
  // =========================
  initForm(): void {

    this.form = this.fb.group({
      clienteId: ['', Validators.required],
      periodo: ['', Validators.required],
      lecturaActual: [0, [Validators.required, Validators.min(0)]],
      observacion: ['']
    });

  }

  // =========================
  // GUARDAR LECTURA
  // =========================
  guardar(): void {

    if (this.form.invalid) {
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    const payload = {
      cliente: {
        id: Number(this.form.value.clienteId)
      },
      periodo: this.form.value.periodo,
      lecturaActual: this.form.value.lecturaActual,
      observacion: this.form.value.observacion
    };

    console.log('FORM VALUE:', this.form.value);
    console.log('PAYLOAD ENVIADO:', payload);

    this.service.registrarLectura(payload).subscribe({

      next: (resp) => {

        console.log('LECTURA GUARDADA:', resp);

        this.mensaje = 'Lectura registrada correctamente';
        this.cargando = false;

        this.nuevaLectura();
      },

      error: (err) => {

        console.error('ERROR COMPLETO:', err);

        this.mensaje = 'Error al registrar lectura';
        this.cargando = false;
      }
    });
  }

  // =========================
  // NUEVA LECTURA
  // =========================
  nuevaLectura(): void {

    this.form.reset({
      clienteId: '',
      periodo: '',
      lecturaActual: 0,
      observacion: ''
    });

    this.mensaje = '';
  }
}