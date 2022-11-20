import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'app/auth/service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {

        if ([400].indexOf(err.status) !== -1) {
          this.messageError(
            {
              title: 'Error', 
              text: this.messageTransform(JSON.parse(err.error.errors))
            }
          );
        }

        if ([401, 403].indexOf(err.status) !== -1) {
          this._authenticationService.logout();
          location.reload();
        }

        //const error = err.error.message || err.statusText;
        return throwError(err);

      })
    );
  }

  messageTransform(message):string {
    if(message.email && message.email.length > 0) return message.email;
    if(message.unauthorized && message.unauthorized.length > 0) return message.unauthorized;
    if(message.message && message.message.length > 0) return message.message;
    return message;
  }

  messageError(message: Message){
    Swal.fire({
      icon: 'error',
      title: message.title,
      text: message.text,
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
    });
  }

}


interface Message {
  title: string;
  text: string;
}