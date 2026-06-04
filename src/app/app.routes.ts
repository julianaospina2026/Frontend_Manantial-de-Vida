import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './cliente/clientes.component';
import { AdminComponent } from './admin/admin.component';
import { OperatorComponent } from './operator/operator.component';
import { UsuarioPortalComponent } from './usuario-portal/usuario-portal.component';
import { FacturaComponent } from './factura/factura.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'clientes', component: ClienteComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'operador', component: OperatorComponent },
    { path: 'portal-usuario', component: UsuarioPortalComponent },
    { path: 'factura/lectura/:lecturaId', component: FacturaComponent },
    { path: 'usuarios', component: UsuarioComponent },
    { path: '**', redirectTo: 'inicio' }
];