import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'Ha iniciado sesión con éxito como un ' +
                  user.role +
                  ' Ahora puedes empezar a explorar. Disfrutar! 🎉',
                '👋 Bienvenido, ' + user.firstName + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }

   /**
   * User Register
   *
   * @param email
   * @param password
   * @param name
   */

   register(user): Observable<any[]> {
    const config = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Accept', 'application/json')
    return this._http.post<any>(`${environment.apiUrl}/api/auth/register`, user, { headers: config });
   }


   registerSocial(user): Observable<any[]> {
    return this._http.post<any>(`${environment.apiUrl}/api/auth/login-social`, user)
    .pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Display welcome toast!
          setTimeout(() => {
            this._toastrService.success(
              'Ha iniciado sesión con éxito como un ' +
                user.role +
                ' Ahora puedes empezar a explorar. Disfrutar! 🎉',
              '👋 Bienvenido, ' + user.firstName + '!',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            );
          }, 2500);

          // notify
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
   }

   promiseError(err: HttpErrorResponse): HttpErrorResponse {
    console.log(err)
    return err;
  }

}



/**
 * quitar el personalizar 
 * manejar errores 
 * formula acento
 * 
 */