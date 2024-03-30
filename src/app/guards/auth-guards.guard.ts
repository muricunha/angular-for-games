import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

export const authGuardsGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);

  const user = authService.getRoles();

  const grupo = route.data['grupo'];

  if(user.grupo.includes(grupo)){
    return true
  }

  return false;
};
