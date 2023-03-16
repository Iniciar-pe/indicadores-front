import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

@Injectable({ providedIn: 'root' })
export class LoginSocialService {
  //public
  public currentUser: Observable<User>;
  public userResponse: any;

  //private
  private currentUserSubject: BehaviorSubject<User>;


  constructor(
    private _http: HttpClient, 
    private _toastrService: ToastrService,
    private auth: Auth
) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  loginGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  loginFaceBook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

  tokenLin(params) {
    return this._http.post<any>(`${environment.apiUrl}/api/auth/loginLn`, params);
  }

  datosLin(params, token) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this._http.get<any>(`https://api.linkedin.com/v2/me?${params}`, { headers });
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
    return err;
  }

  

}
