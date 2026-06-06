import { Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { GenerarInformesComponent } from './admin/generar-informes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OperatorComponent as OperadorComponent } from './operator/operator.component';
import { PresidenteComponent } from './presidente/presidente.component';
import { UsuarioPortalComponent } from './usuario-portal/usuario-portal.component';
import { UsuarioComponent } from './usuario/usuario.component';

import { roleGuard } from './role.guard';

export const routes: Routes = [

  // 🟢 PÚBLICAS
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  // 🟢 USUARIO NORMAL
  { path: 'portal-usuario', component: UsuarioPortalComponent },
  { path: 'pagos', component: UsuarioPortalComponent },
  { path: 'consultas', component: UsuarioPortalComponent },

  // 🔴 ADMINISTRADOR
  {
    path: 'administrador/login',
    component: LoginComponent
  },
  {
    path: 'administrador/panel',
    component: AdminComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },
  {
    path: 'administrador/reporte-facturacion',
    component: GenerarInformesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },
  {
    path: 'administrador/reporte-pagos',
    component: GenerarInformesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },
  {
    path: 'administrador/reporte-lecturas',
    component: GenerarInformesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },
  {
    path: 'administrador/reporte-estratos',
    component: GenerarInformesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMINISTRADOR' }
  },

  // 🟠 OPERADOR
  {
    path: 'operador',
    component: OperadorComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'OPERADOR' }
  },

  // 🟡 PRESIDENTE
  {
    path: 'presidente',
    component: PresidenteComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'PRESIDENTE' }
  },

  // 🔴 FALLBACK
  { path: '**', redirectTo: 'inicio' }
];