import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'app/auth/service';
import { environment } from 'environments/environment';

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
    const routeActivity = window.location.href;
    console.log(routeActivity);
    if (routeActivity.includes('/admin/nuevo-password')) {
      const token = routeActivity.split('token=');
      
      this._router.navigate(['/admin/nuevo-password'], { queryParams: { token: token[1] }});
      return false;
    }

    this._router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
