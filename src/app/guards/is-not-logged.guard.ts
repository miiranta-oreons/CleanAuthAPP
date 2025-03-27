import { CanActivateFn } from '@angular/router';

export const isNotLoggedGuard: CanActivateFn = (route, state) => {
  return true;
};
