import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const roleGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data?.['expectedRole'];
  const currentRole = authService.getRole();

  console.log('🧠 GUARD ACTIVADO');
  console.log('➡ expectedRole:', expectedRole);
  console.log('➡ currentRole:', currentRole);
  console.log('➡ isLoggedIn:', authService.isLoggedIn());

  // ========================
  // NO LOGUEADO
  // ========================
  if (!authService.isLoggedIn()) {
    console.log('❌ Usuario no autenticado');
    router.navigate(['/login']);
    return false;
  }

  // ========================
  // SIN ROL REQUERIDO
  // ========================
  if (!expectedRole) {
    console.log('✅ Ruta pública permitida');
    return true;
  }

  const exp = String(expectedRole)
    .trim()
    .toUpperCase();

  const cur = String(currentRole)
    .trim()
    .toUpperCase();

  console.log('➡ normalized expected:', exp);
  console.log('➡ normalized current:', cur);

  // ========================
  // COINCIDENCIA EXACTA
  // ========================
  if (cur === exp) {
    console.log('✅ ACCESO PERMITIDO');
    return true;
  }

  // ========================
  // ADMINISTRADOR
  // ========================
  if (
    exp === 'ADMINISTRADOR' &&
    (
      cur === 'ADMIN' ||
      cur === 'ROLE_ADMIN' ||
      cur === 'ROLE_ADMINISTRADOR'
    )
  ) {
    console.log('✅ ADMIN EQUIVALENTE');
    return true;
  }

  // ========================
  // USUARIO
  // ========================
  if (
    exp === 'USUARIO' &&
    (
      cur === 'CLIENTE' ||
      cur === 'ROLE_USUARIO'
    )
  ) {
    console.log('✅ USUARIO EQUIVALENTE');
    return true;
  }

  // ========================
  // OPERADOR
  // ========================
  if (
    exp === 'OPERADOR' &&
    (
      cur === 'ROLE_OPERADOR'
    )
  ) {
    console.log('✅ OPERADOR EQUIVALENTE');
    return true;
  }

  // ========================
  // PRESIDENTE
  // ========================
  if (
    exp === 'PRESIDENTE' &&
    (
      cur === 'ROLE_PRESIDENTE'
    )
  ) {
    console.log('✅ PRESIDENTE EQUIVALENTE');
    return true;
  }

  // ========================
  // ACCESO DENEGADO
  // ========================
  console.log('❌ ACCESO DENEGADO');
  console.log('➡ expected:', exp);
  console.log('➡ current:', cur);

  router.navigate(['/inicio']);
  return false;
};