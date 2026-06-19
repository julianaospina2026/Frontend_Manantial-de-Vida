import { Routes } from '@angular/router';

// ========================
// PÚBLICO
// ========================
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

// ========================
// ADMIN
// ========================
import { AdminComponent } from './admin/admin.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { AsignarRolesComponent } from './admin/asignar-roles.component';
import { VerReportesComponent } from './admin/ver-reportes.component';
import { UsuarioComponent } from './usuario/usuario.component';

// ========================
// USUARIO
// ========================
import { UsuarioPortalComponent } from './usuario-portal/usuario-portal.component';
import { PagoComponent } from './pago/pago.component';
import { FacturaComponent } from './factura/factura.component';
import { FinanciacionComponent } from './financiacion/financiacion.component';
import { HistorialLecturaComponent } from './historiallectura/historiallectura.component';
import { HistorialPagosComponent } from './historialpagos/historialpagos.component';

// ========================
// OPERADOR
// ========================
import { OperatorComponent as OperadorComponent } from './operator/operator.component';
import { RegistrarLecturaComponent } from './registrar-lectura/registrar-lectura.component';

// ========================
// PRESIDENTE
// ========================
import { PresidenteComponent } from './presidente/presidente.component';

// ========================
// SISTEMA
// ========================
import { TurnoComponent } from './turno/turno.component';
import { ReportesComponent } from './reportes/reportes.component';

// ========================
// GUARD
// ========================
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
    component: UsuarioPortalComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'USUARIO' }
  },

  {
    path: 'portal-usuario/pagos',
    component: PagoComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'USUARIO' }
  },

  {
    path: 'portal-usuario/historial-pagos',
    component: HistorialPagosComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'USUARIO' }
  },

  {
    path: 'portal-usuario/financiacion',
    component: FinanciacionComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'USUARIO' }
  },

  {
    path: 'portal-usuario/historial-lecturas',
    component: HistorialLecturaComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'USUARIO' }
  },

  {
    path: 'factura/:lecturaId',
    component: FacturaComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'USUARIO' }
  },

  // ========================
  // ADMINISTRADOR
  // ========================
  {
    path: 'administrador/panel',
    component: AdminComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

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

  {
    path: 'admin/pagos',
    component: PagoComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  {
    path: 'admin/facturacion',
    component: FacturaComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  {
    path: 'admin/financiamiento',
    component: FinanciacionComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  {
    path: 'admin/financiamiento/:id',
    component: FinanciacionComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  {
    path: 'admin/turnos',
    component: TurnoComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  {
    path: 'admin/reportes',
    component: ReportesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  {
    path: 'admin/generar-informes',
    component: VerReportesComponent,
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

  {
    path: 'operador/lecturas',
    component: HistorialLecturaComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'OPERADOR' }
  },

  {
    path: 'lecturas/crear/:id',
    component: RegistrarLecturaComponent,
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
  // FALLBACK
  // ========================
  {
    path: '**',
    redirectTo: 'inicio'
  }

];