import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'app/auth/service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;

    if (currentUser) {
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        this._router.navigate(['/admin/login']);
        return false;
      }
      return true;
    }

    this._router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
