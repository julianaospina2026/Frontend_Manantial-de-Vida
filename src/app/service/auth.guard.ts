import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];

  if (authService.isLoggedIn() && authService.getRole() === expectedRole) {
    return true;
  }

  // Redirigir a inicio si no tiene permisos
  router.navigate(['/inicio']);
  return false;
};