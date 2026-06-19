import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Cliente } from '../model/clientes.model';
import { ClienteService } from '../service/clientes.service';

@Component({
  selector: 'app-operator',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {

    this.clienteService.listar().subscribe({

      next: (data: any) => {

        console.log('CLIENTES:', data);

        this.clientes = data || [];
      },

      error: (error) => {

        console.error(
          'Error cargando clientes',
          error
        );
      }
    });
  }
}
