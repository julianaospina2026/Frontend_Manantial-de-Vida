import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AdminComponent } from './admin/admin.component';
import { GenerarInformesComponent } from './admin/generar-informes.component';

import { OperatorComponent as OperadorComponent } from './operator/operator.component';
import { PresidenteComponent } from './presidente/presidente.component';

import { UsuarioPortalComponent } from './usuario-portal/usuario-portal.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

import { AsignarRolesComponent } from './admin/asignar-roles.component';

import { PagoComponent } from './pago/pago.component';
import { FacturaComponent } from './factura/factura.component';
import { FinanciacionComponent } from './financiacion/financiacion.component';
import { TurnoComponent } from './turno/turno.component';
import { ReportesComponent } from './reportes/reportes.component';

import { roleGuard } from './role.guard';

export const routes: Routes = [

  // ========================
  // INICIO
  // ========================
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: HomeComponent
  },

  // ========================
  // LOGIN
  // ========================
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'administrador/login',
    component: LoginComponent
  },

  // ========================
  // PORTAL USUARIO
  // ========================
  {
    path: 'portal-usuario',
    component: UsuarioPortalComponent
  },

  // ========================
  // PANEL ADMINISTRADOR
  // ========================
  {
    path: 'administrador/panel',
    component: AdminComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  // ========================
  // USUARIOS
  // ========================
  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },
  {
    path: 'admin/crear-usuario',
    component: CrearUsuarioComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },
  {
    path: 'admin/asignar-roles',
    component: AsignarRolesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  // ========================
  // PAGOS
  // ========================
  {
    path: 'admin/pagos',
    component: PagoComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  // ========================
  // FACTURACIÓN
  // ========================
  {
    path: 'admin/facturacion',
    component: FacturaComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  // ========================
  // FINANCIAMIENTO
  // ========================
  {
    path: 'admin/financiamiento',
    component: FinanciacionComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  // ========================
  // TURNOS
  // ========================
  {
    path: 'admin/turnos',
    component: TurnoComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  // ========================
  // REPORTE MENSUAL
  // ========================
  {
    path: 'admin/generar-informes',
    component: GenerarInformesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  // ========================
  // REPORTES GENERALES
  // ========================
  {
    path: 'admin/reportes',
    component: ReportesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  // ========================
  // OPERADOR
  // ========================
  {
    path: 'operador',
    component: OperadorComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'OPERADOR' }
  },

  // ========================
  // PRESIDENTE
  // ========================
  {
    path: 'presidente',
    component: PresidenteComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PRESIDENTE' }
  },

  // ========================
  // RUTA NO ENCONTRADA
  // ========================
  {
    path: '**',
    redirectTo: 'inicio'
  }

];