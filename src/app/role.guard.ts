import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router);

  const userRaw = localStorage.getItem('currentUser');

  if (!userRaw) {
    router.navigate(['/administrador/login']);
    return false;
  }

  const user = JSON.parse(userRaw);

  const expectedRole = route.data['expectedRole']?.toUpperCase();

  const userRole = user.role?.toUpperCase();

  if (userRole === expectedRole) {
    return true;
  }

  alert('Acceso denegado: No tienes permisos');

  router.navigate(['/inicio']);
  return false;
};