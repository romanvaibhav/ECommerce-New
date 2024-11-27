import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalAuthService} from '../local-auth/local-auth.service';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  
  const router =inject(Router)
  let localAuthService = inject(LocalAuthService);

  let user = localAuthService.getLoggedInUser();
  if (user) {
    return true;
  }
  router.navigateByUrl('login');
  return false;
};
