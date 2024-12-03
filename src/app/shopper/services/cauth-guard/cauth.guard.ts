import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {ClocalService} from "./../clocal-auth/clocal.service"

export const cauthGuard: CanActivateFn = (route, state) => {
  const router =inject(Router)
  let clocalAuthService = inject(ClocalService);

  let user = clocalAuthService.getcLoggedInUser();
  if (user) {
    return true;
  }
  router.navigateByUrl('login');
  return false;
};
